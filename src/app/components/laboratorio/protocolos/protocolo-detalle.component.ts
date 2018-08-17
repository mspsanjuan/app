import { Input, Output, Component, OnInit, HostBinding, NgModule, ViewContainerRef, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ProtocoloService } from './../../../services/laboratorio/protocolo.service';
import { Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';

@Component({
    selector: 'protocolo-detalle',
    templateUrl: 'protocolo-detalle.html',
    styleUrls: ['./../laboratorio.scss']
})

export class ProtocoloDetalleComponent

 implements OnInit {

    @HostBinding('class.plex-layout') layout = true; // Permite el uso de flex-box en el componente

    public mostrarMasOpciones = false;
    public protocoloSelected: any = {};
    public fechaDesde: any;
    public fechaHasta: any;
    public parametros = [];

    @Output() volverAListaControEmit: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    @Input() protocolos: any;
    @Input('cargarProtocolo')
    set cargarProtocolo(value: any) {
        console.log('cargarProtocolo set', value);
        if (value) {
            this.protocoloSelected = value;
        }
    }

    get cargarProtocolo() {
        console.log('cargarProtocolo get');
        return this.protocoloSelected;
    }

    constructor(public plex: Plex, private formBuilder: FormBuilder,
        public servicioProtocolo: ProtocoloService,
        private router: Router,
        public auth: Auth) { }


    ngOnInit() {
        console.log(this.protocoloSelected);
        console.log(this.protocolos);
    }

    estaSeleccionado(protocolo) {
        return false;
    }

    cargarResultado() {
        console.log('cargarResultado');
    }

    redirect(pagina: string) {
        this.router.navigate(['./' + pagina]);
        return false;
    }

    volverProtocolos() {
        this.volverAListaControEmit.emit(true);
    }

    getPracticas(registros) {
       let registro : any = this.getRegistrosByConceptId(registros, '122869004');

       return registro ? registro.registros : [];
    }

     getCodigoPractica(registros) {
        let registro : any = this.getRegistrosByConceptId(registros, '260299005');
        return (registro) ? registro.valor : '';
    }

    getRegistrosByConceptId(registros, conceptId) {
        return registros.find((reg) => {
            return reg.concepto.conceptId === conceptId;
        });

    }

    getNumeroProtocolo(registros) {
        let registro: any = registros.find((reg) => {
            return reg.nombre === 'numeroProtocolo';
        });
        return registro.valor;
    }

    // Hardcoding para estilizar en HPN
    protocols = [
        {
        id: '716852',
        fecha: '11/07/2018',
        origen: 'ambulatorio',
        servicio: 'clinica',
        usuario: 'lmonteverde',
        solicitante: 'wmolini',
        fechaRegistro: '05/07/2018',
        }
    ];

    practicas = [
        {
        nombre: 'Bilirrubina en sangre',
        estado: 'En proceso',
        concepto: {
            conceptId: '415432',
        }
        }
    ];

    subpracticas = [
        {
        nombre: 'Bili total',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456344',
        }
        },
        {
        nombre: 'Bili directa',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456345',
        }
        },
        {
        nombre: 'Bili indirecta',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456346',
        }
        },
        {
        nombre: 'Colesterol total',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456347',
        }
        },
        {
        nombre: 'Colesterol HDL',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456348',
        }
        },
        {
        nombre: 'Colesterol LDL',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456349',
        }
        },
        {
        nombre: 'Proteinas totales',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456350',
        }
        },
        {
        nombre: 'Ferremia',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456351',
        }
        },
        {
        nombre: 'Transferremia',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456352',
        }
        },
        {
        nombre: 'Saturacion de transferremia',
        metodo: 'Colorimetrico',
        unidad: 'mg/dL',
        concepto: {
            conceptId: '456353',
        }
        }
    ];
}



