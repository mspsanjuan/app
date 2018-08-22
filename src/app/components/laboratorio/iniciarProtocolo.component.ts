import { Input, Output, Component, OnInit, HostBinding, NgModule, ViewContainerRef, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';
import { IPaciente } from '../../interfaces/IPaciente';
import { TipoPrestacionService } from '../../services/tipoPrestacion.service';
import { OrganizacionService } from '../../services/organizacion.service';
import { ProfesionalService } from '../../services/profesional.service';
import { PrestacionesService } from '../../modules/rup/services/prestaciones.service';
import * as enumerados from './../../utils/enumerados';
@Component({
    selector: 'iniciarProtocolo',
    templateUrl: 'iniciarProtocolo.html'

})

export class IniciarProtocoloComponent {

    @HostBinding('class.plex-layout') layout = true;

    showSeleccionarPaciente = true;
    paciente: any;
    motivo: '';
    fecha: any;
    prestacionDestino: any;
    prestacionOrigen: any;

    modelo: any = {
        paciente: {
            id: '',
            nombre: '',
            apellido: '',
            documento: '',
            sexo: '',
            fechaNacimiento: null
        },
        solicitud: {
            tipoPrestacion: null,
            tipoPrestacionOrigen: null,
            //organizacion: null,
            efectorSolicitante: null,
            //profesional: null,
            profesionalOrigen: null,
            fecha: null,
            fechaSolicitud: null,
            ambitoOrigen: 'ambulatorio',
            prioridad: null,
            servicio: null,
            //turno: null,
            registros: [],
            prestacionOrigen: null
        },
        estados: []
    };

    constructor(
        private plex: Plex,
        private auth: Auth,
        private formBuilder: FormBuilder,
        private router: Router,
        private servicioTipoPrestacion: TipoPrestacionService,
        private servicioOrganizacion: OrganizacionService,
        private servicioProfesional: ProfesionalService,
        private servicioPrestacion: PrestacionesService,


    ) { }

    seleccionarPaciente(paciente: any): void {
        this.paciente = paciente;
        this.showSeleccionarPaciente = false;
    }

    loadOrganizacion(event) {
        if (event.query) {
            let query = {
                nombre: event.query
            };
            this.servicioOrganizacion.get(query).subscribe(resultado => {
                event.callback(resultado);
            });
        } else {
            event.callback([]);
        }
    }

    loadProfesionales(event) {
        if (event.query) {
            let query = {
                nombreCompleto: event.query
            };
            this.servicioProfesional.get(query).subscribe(event.callback);
        } else {
            event.callback([]);
        }
    }

    loadServicios($event) {
        this.servicioOrganizacion.getById(this.auth.organizacion.id).subscribe((organizacion: any) => {
            console.log(organizacion);
            let servicioEnum = organizacion.unidadesOrganizativas;
            $event.callback(servicioEnum);
        });

    }
    loadPrioridad(event) {
        event.callback(enumerados.getPrioridadesLab());
        return enumerados.getPrioridadesLab();
    }
    public busqueda = {
        dniPaciente: null,
        nombrePaciente: null,
        apellidoPaciente: null,
    };



}

