import { Plex } from '@andes/plex';
import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Auth } from '@andes/auth';
import { AppComponent } from './../../app.component';
@Component({
    templateUrl: 'inicio.html'
})
export class InicioComponent implements AfterViewInit {
    @HostBinding('class.plex-layout') layout = true;
    public paciente = {
        '_id': '586e6e9627d3107fde1780ca',
        'id': '586e6e9627d3107fde1780ca',
        'documento': '50857784',
        'estado': 'validado',
        'nombre': 'IAN',
        'apellido': 'ZAPATA',
        'sexo': 'masculino',
        'genero': 'masculino',
        'fechaNacimiento': '2011-01-15T00:00:00.000-03:00',
        'estadoCivil': null
    };

    constructor(public auth: Auth, public appComponent: AppComponent) { }

    ngAfterViewInit() {
        window.setTimeout(() => {
        });
    }
}
