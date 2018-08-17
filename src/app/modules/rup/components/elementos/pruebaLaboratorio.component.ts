import { RUPComponent } from './../core/rup.component';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import * as enumerados from './../../../../utils/enumerados';

@Component({
    selector: 'rup-pruebaLaboratorio',
    templateUrl: 'pruebaLaboratorio.html'
})
export class PruebaLaboratorioComponent extends RUPComponent implements OnInit {
    // Tipos de Prestaciones a las que el usuario tiene permiso
    public tiposPrestacion: any = [];
    public prestacionSeleccion;
    public darTurnoEmit = new EventEmitter<any>();
    ngOnInit() {
        // Buscamos los tipos de prestación que sean turneables para los que el tenga permisos
        // (OBS: a futuro un profesional puede tener permisos para más Prestaciones que no sean turneables)
        if (!this.registro.valor) {
            this.registro.valor = {
                solicitudPrestacion: {}
            };
            this.registro.valor.solicitudPrestacion['autocitado'] = false;
            //this.registro.valor.solicitudPrestacion['prestacionSolicitada'] = this.tiposPrestacion.find(tp => tp.conceptId === this.registro.concepto.conceptId);

            this.registro.valor.solicitudPrestacion['prestacionSolicitada'] = this.tiposPrestacion.find(tp => tp.conceptId === this.prestacion.solicitud.tipoPrestacion.conceptId);

        }

    }

    loadPrioridad(event) {
        event.callback(enumerados.getPrioridadesLab());
        return enumerados.getPrioridadesLab();

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
            let callback = (this.registro.valor.solicitudPrestacion.organizacionDestino) ? this.registro.valor.solicitudPrestacion.organizacionDestino : null;
            event.callback(callback);
        }
    }

    loadServicios(event) {
        this.servicioOrganizacion.getById(this.auth.organizacion.id).subscribe((organizacion: any) => {
            let servicioEnum = organizacion.unidadesOrganizativas;
            event.callback(servicioEnum);
        });

    }

    loadPracticas(event) {
        this.snomedService.getQuery({ expression: '<<88308000' }).subscribe(result => {
            event.callback(result);
        });

    }





}
