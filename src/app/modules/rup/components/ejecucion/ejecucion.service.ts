import { Injectable } from '@angular/core';
import { IPrestacion } from '../../interfaces/prestacion.interface';
import { Router } from '@angular/router';

@Injectable()
export class EjecucionService {
    constructor (private router: Router) {

    }
    public prestacionPadre: IPrestacion = null;

    navigateBack() {
        const url =  'rup/ejecucion/' + this.prestacionPadre.id;
        this.prestacionPadre = null;
        this.router.navigate([url]);
    }


}