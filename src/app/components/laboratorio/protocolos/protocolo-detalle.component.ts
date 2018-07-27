import { Input, Output, Component, OnInit, HostBinding, NgModule, ViewContainerRef, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ProtocoloService } from './../../../services/laboratorio/protocolo.service';
import { Router } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';

@Component({
    selector: 'protocolo-detalle',
    templateUrl: 'protocolo-detalle.html'
})

export class ProtocoloDetalleComponent

 implements OnInit {

    @HostBinding('class.plex-layout') layout = true; // Permite el uso de flex-box en el componente

    public mostrarMasOpciones = false;
    public protocolo: any = {};
    public fechaDesde: any;
    public fechaHasta: any;
    public parametros = [];

    @Output() volverAListaControEmit: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    @Input('cargarProtocolo')
    set cargarProtocolo(value: any) {
        console.log('cargarProtocolo set', value)
        if (value) {
            this.protocolo = value;
        }
    }

    get cargarProtocolo() {
        console.log('cargarProtocolo get')
        return this.protocolo;
    }

    constructor(public plex: Plex, private formBuilder: FormBuilder, 
        public servicioProtocolo: ProtocoloService,
        private router: Router,
        public auth: Auth) { }
        

    ngOnInit() {
    }
    
    estaSeleccionado(protocolo) {
        return false;
    }

    cargarResultado() {
        console.log('cargarResultado')
    }

    redirect(pagina: string) {
        this.router.navigate(['./' + pagina]);
        return false;
    }

    volverProtocolos() {
        this.volverAListaControEmit.emit(true);
    }
 
    getPracticas() {
        return this.findPracticas(this.protocolo.ejecucion.registros);
    }

    findPracticas(registros) {
       let registro : any = this.getRegistrosByConceptId(registros, '122869004')
       return registro ? registro.registros : [];
    }

     getCodigoPractica(registros) {
        let registro : any = this.getRegistrosByConceptId(registros, '260299005')
        return (registro) ? registro.valor : '';
    }

    getRegistrosByConceptId(registros, conceptId) {
        return registros.find((reg) => {
            return reg.concepto.conceptId == conceptId;
        });
    
    }
}
