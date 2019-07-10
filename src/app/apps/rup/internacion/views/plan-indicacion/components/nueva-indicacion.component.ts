import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plex } from '@andes/plex';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlanIndicaionService } from '../plan-indicacion.service';


@Component({
    selector: 'internacion-nueva-indicacion',
    templateUrl: './nueva-indicacion.component.html'
    // styleUrls: ['./plan-indicacion.component.scss'],
})
export class NuevaIndicacionComponent implements OnInit {

    constructor(
        private plex: Plex,
        private route: ActivatedRoute,
        private pi: PlanIndicaionService,
        private location: Location
    ) { }

    public mainCol = 12;
    public indicacionesM = null;
    public indicacionesE = null;
    public evoluciones = null;
    public paciente;

    public elemento;
    public registro;

    ngOnInit() {
        this.route.queryParams.pipe(map(p => p.conceptId)).subscribe(conceptId => {
            const data = this.pi.createElementRupIndicacion(conceptId);
            this.elemento = data.elemento;
            this.registro = data.registro;
        });
    }


    save() {
        this.pi.addIndicacion(this.registro).subscribe(() => {
            this.location.back();
        });
    }

    close() {
        this.location.back();
    }

}

