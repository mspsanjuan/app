import { Plex } from '@andes/plex';
import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Auth } from '@andes/auth';
import { AppComponent } from './../../app.component';
@Component({
    templateUrl: 'inicio.html'
})
export class InicioComponent implements AfterViewInit {
    @HostBinding('class.plex-layout') layout = true;

    constructor(public auth: Auth, public appComponent: AppComponent) { }

    ngAfterViewInit() {
        window.setTimeout(() => {
        });
    }
}
