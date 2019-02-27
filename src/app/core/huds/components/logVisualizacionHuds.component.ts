import { IPacienteMatch } from './../../../modules/mpi/interfaces/IPacienteMatch.inteface';
import { Component, OnInit } from '@angular/core';
import { IPaciente } from '../../../interfaces/IPaciente';
import { PacienteBuscarResultado } from '../../../modules/mpi/interfaces/PacienteBuscarResultado.inteface';
import { Plex } from '@andes/plex';
import { LogHudsService } from '../services/logHuds.service';
import { ILog } from '../../../shared/interfaces/ILog';
import { Auth } from '@andes/auth';
import { Router } from '@angular/router';
@Component({
    selector: 'logVisualizacionHuds',
    templateUrl: 'logVisualizacionHuds.html'
})

export class LogVisualizacionHudsComponent implements OnInit {

    pacientes: IPacienteMatch[];
    paciente: IPaciente;
    logs: ILog[] = [];

    constructor(private plex: Plex, private logHudsService: LogHudsService, private auth: Auth, private router: Router) { }
    ngOnInit() {
        if (!this.auth.check('huds:access')) {
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
        this.logHudsService.get({ paciente: this.paciente.id }).subscribe(res => {
            this.logs = res;
        });
        let log = {
            key: 'huds:access',
            paciente: '592eef17bc8af3954c9e5142',
            fecha: new Date(2019, 2, 19), // ('2019-02-19T22:07:59.202-03:00'),
            operacion: '/prestaciones?idPaciente=59a5a5b97da1c21788527820',
            usuario: {
                id: '5a5dd87d05623e8adb65c945',
                nombreCompleto: '26108063 26108063',
                nombre: 'José',
                apellido: 'Pérez',
                username: 26108063,
                documento: 26108063
            },
            app: 'huds',
            organizacion: {
                _id: '57e9670e52df311059bc8964',
                nombre: 'HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON',
                id: '57e9670e52df311059bc8964'
            },
            data: { anterior: 'anterior', valor: 'X' }, // valor agregado por mi
            cliente: {
                ip: '::ffff:127.0.0.1',
                userAgent: { // agregado por mi
                    isMobile: true,
                    isDesktop: false,
                    isBot: false,
                    browser: 'Chrome',
                    version: '40',
                    os: 'Linux',
                    platform: 'Mint',
                    source: 'No se'
                }
            },
            servidor: {
                ip: '::ffff:127.0.0.1'
            }
        };
        // for (let i = 0; i < 40; i++) {
        //     this.logs.push(log);
        // }
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
}
