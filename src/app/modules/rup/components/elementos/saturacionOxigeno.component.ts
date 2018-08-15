import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { RUPComponent } from './../core/rup.component';

import * as moment from 'moment';
@Component({
    selector: 'rup-saturacion-oxigeno',
    templateUrl: 'saturacionOxigeno.html'
})
export class SaturacionOxigenoComponent extends RUPComponent implements OnInit {
    ngOnInit() {
        // Observa cuando cambia la propiedad 'SaturacionOxigeno' en otro elemento RUP
        if (!this.soloValores) {
            this.conceptObserverService.observe(this.registro).subscribe((data) => {
                // No soy yo mismo
                if (this.registro !== data && this.registro.valor !== data.valor) {
                    this.registro.valor = data.valor;
                    this.emitChange(false);
                }
            });
        }
        if (this.registro.valor) {
            this.mensaje = this.getMensajes();
        }
    }
    getMensajes() {
        const saturacionOxigeno = this.registro.valor;
        let edadEnMeses;

        // Calculo Edad en Meses
        const edadMeses: any = null;
        let fechaNac: any;
        const fechaActual: Date = new Date();
        let fechaAct: any;
        let difDias: any;
        fechaNac = moment(this.paciente.fechaNacimiento, 'YYYY-MM-DD HH:mm:ss');
        fechaAct = moment(fechaActual, 'YYYY-MM-DD HH:mm:ss');
        difDias = fechaAct.diff(fechaNac, 'd');     // Diferencia en días
        edadEnMeses = Math.trunc(difDias / 30.4375); // Diferencia en Meses

        const mensaje: any = {
            texto: '',
            class: 'danger'
        };

        if (saturacionOxigeno) {
            // agregar validaciones aca en base al paciente y el tipo de prestacion
            if (saturacionOxigeno <= 89) {
                mensaje.texto = 'Hipoxemia Severa';
            }
            if (saturacionOxigeno >= 90 && saturacionOxigeno <= 94) {
                mensaje.texto = 'Hipoxemia';
            }
        }
        return mensaje;
    }
}
