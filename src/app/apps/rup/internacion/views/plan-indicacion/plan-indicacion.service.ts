import { Injectable } from '@angular/core';
import { PrestacionesService } from '../../../../../modules/rup/services/prestaciones.service';
import { ElementosRUPService } from '../../../../../modules/rup/services/elementosRUP.service';
import { IPrestacionRegistro } from '../../../../../modules/rup/interfaces/prestacion.registro.interface';
import { PacienteService } from '../../../../../core/mpi/services/paciente.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const PIEnfermeria = {
    'conceptId': '4991000013108',
    'fsn': 'plan de indicaciones de enfermería (procedimiento)',
    'semanticTag': 'procedimiento',
    'term': 'plan de indicaciones de enfermería',
    'refsetIds': []
};

const PIMedica = {
    'conceptId': '4981000013105',
    'fsn': 'plan de indicaciones médicas (procedimiento)',
    'semanticTag': 'procedimiento',
    'term': 'plan de indicaciones médicas',
    'refsetIds': []
};

const PrestacionEjecucionEnfermería = {
    'conceptId': '861000013109',
    'fsn': 'consulta de enfermería (procedimiento)',
    'semanticTag': 'procedimiento',
    'term': 'consulta de enfermería',
    'refsetIds': []
};

export const TextoLibreConceptId = {
    'fsn': 'prescripción (procedimiento)',
    'semanticTag': 'procedimiento',
    'conceptId': '16076005',
    'term': 'prescripción de'
};

@Injectable()
export class PlanIndicaionService {
    private indicaciones = new BehaviorSubject([]);
    public indicaciones$ = this.indicaciones.asObservable();
    public mapaEvoluciones = {};

    constructor(
        private prestacionService: PrestacionesService,
        private elementosRUPService: ElementosRUPService,
        private servicioPaciente: PacienteService,
        private prestaciones: PrestacionesService,
    ) {

    }
    public conceptCache = {
        '16076005': TextoLibreConceptId
    };

    get prestacionIndicacion() {
        return this.indicacionesM;
    }

    evolucion(id, hora) {
        if (!this.mapaEvoluciones[id]) {
            this.mapaEvoluciones[id] = {};
        }
        if (!this.mapaEvoluciones[id][hora]) {
            this.mapaEvoluciones[id][hora] = new BehaviorSubject(null);
        }
        return this.mapaEvoluciones[id][hora];
    }

    private refresh() {
        function procesarIndicacion(registro) {
            if (registro.concepto.conceptId === TextoLibreConceptId.conceptId) {
                return {
                    id: registro.id,
                    title: registro.registros[0].valor,
                    subtitle: registro.registros[1].valor.concepto && registro.registros[1].valor.concepto.term,
                    _registro: registro
                };
            }
        }


        let indicaciones = [];
        if (this.indicacionesM) {
            indicaciones = [...indicaciones, ...this.indicacionesM.ejecucion.registros];
        }
        if (this.indicacionesE) {
            indicaciones = [...indicaciones, ...this.indicacionesE.ejecucion.registros];
        }
        this.indicaciones.next(indicaciones.map(procesarIndicacion));
    }

    crearPrestacionIndicacion(paciente, snomed) {
        const prestacion = this.prestacionService.inicializarPrestacion(paciente, snomed, 'ejecucion', 'internacion');
        return this.prestacionService.post(prestacion);
    }

    nuevoRegistro(snomedConcept, valor = null) {
        const esSolicitud = true;
        const elementoRUP = this.elementosRUPService.buscarElemento(snomedConcept, esSolicitud);

        // armamos el elemento data a agregar al array de registros
        const nuevoRegistro = new IPrestacionRegistro(elementoRUP, snomedConcept);
        nuevoRegistro['_id'] = nuevoRegistro.id;

        nuevoRegistro.esSolicitud = true;
        nuevoRegistro.valor = valor;

        // prestacion.ejecucion.registros.splice(prestacion.ejecucion.registros.length, 0, nuevoRegistro);
        return { registro: nuevoRegistro, elemento: elementoRUP };
    }

    public paciente;
    public indicacionesM = null;
    public indicacionesE = null;
    public evoluciones = null;

    setPaciente(idPaciente) {
        const params = {
            tipoPrestaciones: [PIEnfermeria.conceptId, PIMedica.conceptId, PrestacionEjecucionEnfermería.conceptId],
            idPaciente,
            fechaDesde: moment().subtract(1, 'week').toDate()
        };
        this.servicioPaciente.getById(idPaciente).subscribe(p => { this.paciente = p; });
        this.prestaciones.get(params).subscribe((prestaciones) => {
            function esIndicacionM(prestacion) {
                return prestacion.solicitud.tipoPrestacion.conceptId === PIMedica.conceptId;
            }
            function esIndicacionE(prestacion) {
                return prestacion.solicitud.tipoPrestacion.conceptId === PIEnfermeria.conceptId;
            }
            function esEvolucion(prestacion) {
                return prestacion.solicitud.tipoPrestacion.conceptId === PrestacionEjecucionEnfermería.conceptId;
            }
            function sortByEjecucion(A, B) {
                return moment(B.ejecucion.fecha).diff(A.ejecucion.fecha);
            }
            this.indicacionesM = prestaciones.filter(esIndicacionM).sort(sortByEjecucion).shift();
            this.indicacionesE = prestaciones.filter(esIndicacionE).sort(sortByEjecucion).shift();
            this.evoluciones = prestaciones.filter(esEvolucion).sort(sortByEjecucion).shift();

            this.refresh();
        });
    }

    addIndicacion(registro) {
        // if (!this.indicacionesM && !this.indicacionesE) {
        //     this.crearPrestacionIndicacion(this.paciente, PIMedica).subscribe(prestacion => {
        //     });
        // } else {
        // }
        return this.prestaciones.postRegistro(this.prestacionIndicacion, registro).pipe(tap(r => {
            this.prestacionIndicacion.ejecucion.registros.push(r);
            this.refresh();

        }));
    }

    createElementRupIndicacion(conceptId) {
        const concept = this.conceptCache[conceptId];
        const { registro, elemento } = this.nuevoRegistro(concept, {});
        return { registro, elemento };
    }
}
