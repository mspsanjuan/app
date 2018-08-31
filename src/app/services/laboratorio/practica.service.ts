import { Observable } from 'rxjs/Rx';
import { PracticaSearch } from './practicaSearch.interface';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { IPracticaMatch } from '../../components/laboratorio/interfaces/IPracticaMatch.inteface';

@Injectable()
export class PracticaService {
    private practicaUrl = '/modules/laboratorio/practicas'; // URL API
    constructor(private server: Server) { }


    /**
     * TEMPORAL.
     * @param {PracticaSearch} params
     * @returns {Observable<IPracticaMatch[]>}
     * @memberof PracticaService
     */
    getMatch(params: PracticaSearch): Observable<IPracticaMatch[]> {
        return this.server.get(this.practicaUrl, { params: params, showError: true }).map((value) => {
            return value;

        });
    }

}
