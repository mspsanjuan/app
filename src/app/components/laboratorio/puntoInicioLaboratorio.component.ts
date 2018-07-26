import { Component, OnInit, HostBinding, NgModule, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ProtocoloService } from './../../services/laboratorio/protocolo.service';
// import {
//     Router
// } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';


@Component({
    selector: 'gestor-protocolos',
    templateUrl: 'puntoInicioLaboratorio.html',
    styleUrls: ['./laboratorio.scss']
})

export class PuntoInicioLaboratorioComponent

 implements OnInit {

    public showListarProtocolos = true;
    public showProtocoloDetalle = false;
    public protocolos: any = [];
    public protocolo: any = {};
    public fechaDesde: any;
    public fechaHasta: any;
    public parametros = [];


    // Detalle protocolo
    model:any = {};
    model2:any = {};
    msg:string = '';

    constructor(public plex: Plex, private formBuilder: FormBuilder, 
        public servicioProtocolo: ProtocoloService,
        public auth: Auth) { }

    ngOnInit() {
    }

    

    // funciones
    refreshSelection(value, tipo) {
        if (tipo === 'fechaDesde') {
            let fechaDesde = moment(this.fechaDesde).startOf('day');
            if (fechaDesde.isValid()) {
                this.parametros['fechaDesde'] = fechaDesde.isValid() ? fechaDesde.toDate() : moment().format();
                this.parametros['organizacion'] = this.auth.organizacion._id;
            }
        }
        if (tipo === 'fechaHasta') {
            let fechaHasta = moment(this.fechaHasta).endOf('day');
            if (fechaHasta.isValid()) {
                this.parametros['fechaHasta'] = fechaHasta.isValid() ? fechaHasta.toDate() : moment().format();
                this.parametros['organizacion'] = this.auth.organizacion._id;
            }
        }

        this.getProtocolos(this.parametros);
    };

    getProtocolos(params: any) {
        console.log('getProtocolos')
        this.servicioProtocolo.get(params).subscribe(protocolos => {
            // this.servicioPrestaciones.get(params).subscribe(protocolos => {
            this.protocolos = protocolos;
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    estaSeleccionado(protocolo) {
        return false;
    }

    verProtocolo(protocolo, multiple, e) {
        // Si se presionó el boton suspender, no se muestran otros protocolos hasta que se confirme o cancele la acción.
        
            if (protocolo && protocolo.id) {
                // this.serviceAgenda.getById(agenda.id).subscribe(ag => {
                    
                    this.protocolo = protocolo;
                    this.showListarProtocolos = false;
                    this.showProtocoloDetalle = true;
            // }
        }
    }

    loadSectores (e) {
        return {};
    }

    loadAreasValidacion (e) {
        return {};
    }

    loadEfectores (e) {
        return {};
    }

    loadProtocolo(e) {

    }

    loadSector(e) {

    }


    // Hardcodeo
    protocols = [
        {
        id: '716852',
        fecha: '11/07/2018',
        origen:'ambulatorio',
        servicio:'clinica',
        usuario:'lmonteverde',
        solicitante:'wmolini',
        fechaRegistro:'05/07/2018',
        },
        {
        id: '516846',
        fecha: '17/07/2018',
        origen:'ambulatorio',
        servicio:'clinica',
        usuario:'lmonteverde',
        solicitante:'wmolini',
        fechaRegistro:'09/07/2018',
        },
        {
        id: '354879',
        fecha: '13/07/2018',
        origen:'guardia',
        servicio:'clinica',
        usuario:'lmonteverde',
        solicitante:'wmolini',
        fechaRegistro:'11/07/2018',
        }
    ];
    
}



