import { Component, Input, OnInit } from '@angular/core';
import { IPrestacion } from '../../../interfaces/prestacion.interface';
import { IElementoRUP } from '../../../interfaces/elementoRUP.interface';
import { PrestacionesService } from '../../../services/prestaciones.service';
import { ElementosRUPService } from '../../../services/elementosRUP.service';
import { Plex } from '@andes/plex';
import { Router } from '@angular/router';
import { TipoPrestacionService } from '../../../../../services/tipoPrestacion.service';
import { Auth } from '@andes/auth';
import { EjecucionService } from '../ejecucion.service';

@Component({
    selector: 'tab-multiprestacion',
    templateUrl: 'multiprestacion.html'
})
export class MultiprestacionTabComponent implements OnInit {

    @Input() prestacion: IPrestacion;
    @Input() elementoRUP: IElementoRUP;

    private loading = false;
    private presContenidas: IPrestacion[] = [];
    public prestacionesDisponibles: any = [];
    public selectedPrestacion: any = null;

    constructor(
        private ejecucionService: EjecucionService,
        private servicioPrestacion: PrestacionesService,
        public elementosRUPService: ElementosRUPService,
        public servicioTipoPrestacion: TipoPrestacionService,
        public plex: Plex,
        public auth: Auth,
        private router: Router) {

    }

    ngOnInit() {
        this.loading = true;
        this.servicioPrestacion.get({ perteneceA: this.prestacion.id }).subscribe((prestaciones) => {
            this.loading = false;
            this.presContenidas = prestaciones;
        });

        this.servicioTipoPrestacion.get({ id: this.auth.getPermissions('rup:tipoPrestacion:?') }).subscribe(data => {
            this.prestacionesDisponibles = data;
        });
    }

    /**
     * Chequea so una prestación hija es requerida en los elementosRUP
     * @param presHija
     */
    esRequerida(presHija) {
        let _conceptID = presHija.solicitud.tipoPrestacion.conceptId;
        for (let elemento of this.elementoRUP.requeridos) {

            if (_conceptID === elemento.concepto.conceptId) {
                return true;
            }
        }
        return false;
    }

    /**
     * Dado un elementoRUP, busca una prestación de ese tipo
     * @param conceptId
     */
    findHijo(conceptId) {
        for (let prestacion of this.presContenidas) {
            let _conceptID = prestacion.solicitud.tipoPrestacion.conceptId;
            if (_conceptID === conceptId) {
                return prestacion;
            }
        }
        return null;
    }

    /**
     * Chequea si un elementoRUP tiene prestación
     * @param elemento
     */
    isPresent(elemento) {
        return !!this.findHijo(elemento.concepto.conceptId);
    }

    /**
     * Devuelve el último estado de un prestación
     */

    getEstado(child) {
        let pres = this.findHijo(child.concepto.conceptId);
        if (pres) {
            return pres.estados[pres.estados.length - 1].tipo;
        }
        return '';
    }

    /**
     * Ejecuta una prestación hija
     * @param concept
     */
    iniciarPrestacion(concept) {
        let msg = `Paciente: <b> ${this.prestacion.paciente.apellido}, ${this.prestacion.paciente.nombre}.
                   </b><br>
                   Prestación: <b> ${concept.term} </b>, ¿Crear Prestación?`;

        this.plex.confirm(msg).then(confirmacion => {
            if (confirmacion) {
                this.servicioPrestacion.crearPrestacionHija(this.prestacion, concept).subscribe(prestacion => {
                    this.ejecucionService.prestacionPadre = prestacion;
                    this.router.navigate(['rup/ejecucion/' + prestacion.id]);
                }, (err) => {
                    this.plex.alert('No fue posible crear la prestación', 'ERROR');
                });
            } else {
                return false;
            }
        });
    }

    /**
     * Navega hacía un prestación
     * @param data
     */

    verPrestacion(data: any) {
        let id = '';
        if (typeof data === 'string') {
            id = data;
        } else {
            let pres: any = this.findHijo(data.concepto.conceptId);
            id = pres ? pres.id : null;
        }
        if (id) {
            this.ejecucionService.prestacionPadre = this.prestacion;
            this.router.navigate(['rup/ejecucion/' + id]);
        }
    }

    /**
     * Crea una prestación adicional
     */
    nuevoPrestacion() {
        this.iniciarPrestacion(this.selectedPrestacion);
    }
}
