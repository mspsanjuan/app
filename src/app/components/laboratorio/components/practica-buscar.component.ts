import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PracticaService } from '../../../services/laboratorio/practica.service';
import { LogService } from '../../../services/log.service';
import { Plex } from '@andes/plex';
import { PracticaBuscarResultado } from '../interfaces/PracticaBuscarResultado.inteface';

@Component({
    selector: 'practica-buscar',
    templateUrl: 'practica-buscar.html'
})
export class PracticaBuscarComponent implements OnInit, OnDestroy {
    private tiempoEspera: number;
    public textoLibre: string = null;
    public autoFocus = 0;

    // Eventos
    @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEnd: EventEmitter<PracticaBuscarResultado> = new EventEmitter<PracticaBuscarResultado>();
    @Output() searchClear: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private plex: Plex,
        private PracticaService: PracticaService,
        private logService: LogService) {
    }

    public ngOnInit() {
        this.autoFocus = this.autoFocus + 1;
    }

    ngOnDestroy(): void {
        clearInterval(this.tiempoEspera);
    }

    /**
     * Busca una practica cada vez que el campo de busqueda cambia su valor
     */
    public buscar($event) {
        /* Error en Plex, ejecuta un change cuando el input pierde el foco porque detecta que cambia el valor */
        if ($event.type) {
            return;
        }
        // Cancela la búsqueda anterior
        if (this.tiempoEspera) {
            window.clearTimeout(this.tiempoEspera);
        }

        let textoLibre = this.textoLibre && this.textoLibre.trim();
        // Inicia búsqueda
        if (textoLibre) {
            this.tiempoEspera = window.setTimeout(() => {
                this.searchStart.emit();
                this.tiempoEspera = null;
                this.PracticaService.getMatch({
                    cadenaInput: textoLibre
                }).subscribe(
                    resultado => this.searchEnd.emit({ practicas: resultado, err: null }),
                    (err) => this.searchEnd.emit({ practicas: [], err: err })
                );
            }, 200);
        } else {
            this.searchClear.emit();
        }
    }

}
