import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlanIndicaionService } from '../plan-indicacion.service';


@Component({
    selector: 'internacion-evolucionar-indicacion',
    templateUrl: './evolucionar-indicacion.component.html'
    // styleUrls: ['./plan-indicacion.component.scss'],
})
export class EvolucionarIndicacionComponent implements OnInit {

    constructor(
        private plex: Plex,
        private route: ActivatedRoute,
        private pi: PlanIndicaionService,
        private location: Location
    ) { }

    public idRegistro;
    public registro;
    public hora;

    ngOnInit() {
        this.route.queryParams.subscribe(query => {
            const { registro, hora } = query;
            this.idRegistro = registro;
            this.hora = hora;
            this.pi.indicaciones$.subscribe(registros => {
                this.registro = registros.find(r => r.id === registro);
            });
        });
    }

    save() {
    }

    close() {
        this.location.back();
    }

}

