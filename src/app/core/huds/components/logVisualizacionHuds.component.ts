import { IPacienteMatch } from './../../../modules/mpi/interfaces/IPacienteMatch.inteface';
import { Component, OnInit } from '@angular/core';
import { IPaciente } from '../../../interfaces/IPaciente';
import { PacienteBuscarResultado } from '../../../modules/mpi/interfaces/PacienteBuscarResultado.inteface';
import { Plex } from '@andes/plex';
import { LogHudsService } from '../services/logHuds.service';
import { ILog } from '../../../shared/interfaces/ILog';
import { Auth } from '@andes/auth';
import { Router } from '@angular/router';

/*
* Limita la cantidad de logs a cargar a 50 por vez
*/
const limit = 50;
@Component({
    selector: 'logVisualizacionHuds',
    templateUrl: 'logVisualizacionHuds.html'
})

export class LogVisualizacionHudsComponent implements OnInit {

    /**
     * Pacientes que retorna la búsqueda
     * @type {IPacienteMatch[]}
     * @memberof LogVisualizacionHudsComponent
     */
    pacientes: IPacienteMatch[];
    /**
     * Paciente seleccionado para visualizar su bitácora de acceso a la HUDS
     * @type {IPaciente}
     * @memberof LogVisualizacionHudsComponent
     */
    paciente: IPaciente;
    /**
     * Cada acceso a la HUDS del paciente seleccionado. Es lo que se muestra en la tabla principal
     * @type {ILog[]}
     * @memberof LogVisualizacionHudsComponent
     */
    logs: ILog[] = [];

    /**
     * Para el plex-scroll, trae los resultados a partir del skip
     * @private
     * @memberof LogVisualizacionHudsComponent
     */
    private skip = 0;
    /**
     * Indica si se debe mostrar el plex-loader
     * @memberof LogVisualizacionHudsComponent
     */
    public loader = true;
    /**
     * Indica si ya se mostraron todos los resultados
     * @memberof LogVisualizacionHudsComponent
     */
    public finScroll = false;
    constructor(private plex: Plex, private logHudsService: LogHudsService, private auth: Auth, private router: Router) { }
    ngOnInit() {
        if (!this.auth.check('huds:log')) {
            this.router.navigate(['./inicio']);
        }
        this.plex.updateTitle('HUDS | Bitácora de Acceso');
    }
    /**
     * Cuando se selecciona un paciente, se dispara esta función
     * @param {IPaciente} event
     * @memberof LogVisualizacionHudsComponent
     */
    public seleccionPaciente(event: IPaciente) {
        this.paciente = event;
        this.cargarDatos(false);
    }
    cargarDatos(concatenar: boolean = false) {
        // this.logHudsService.get({ paciente: this.paciente.id }).subscribe((res: ILog[]) => {
        //     // this.logs = res;
        //     if (res) {
        //         for (let i = 0; i < 5000; i++) {
        //             this.logs.push(...res);
        //         }
        //     }
        // });


        let parametros = { paciente: this.paciente.id, skip: this.skip, limit: limit };
        this.logHudsService.get(parametros).subscribe(
            registros => {
                if (concatenar) {
                    if (registros.length > 0) {
                        this.logs = this.logs.concat(registros);
                    } else {
                        this.finScroll = true;
                    }
                } else {
                    this.logs = registros;
                    this.finScroll = false;
                }
                this.loader = false;
            });
    }

    searchEnd(resultado: PacienteBuscarResultado) {
        if (resultado.err) {
            this.plex.info('danger', resultado.err);
        } else {
            this.pacientes = resultado.pacientes;
        }
    }

    borrarResultadosBusqueda(event) {
        this.pacientes = null;
        this.paciente = null;
    }

    nextPage() {
        if (!this.finScroll) {
            this.skip += limit;
            this.cargarDatos(true);
            this.loader = true;
        }
    }
}
