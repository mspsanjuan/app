import { ITipoPrestacion } from './../interfaces/ITipoPrestacion';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Server } from '@andes/shared';
import { IPrestacion } from '../interfaces/turnos/IPrestacion';

@Injectable()
export class TipoPrestacionService {

    private tipoPrestacionUrl = '/core/tm/v2/tipoPrestaciones';  // URL to web api v2
    // private tipoPrestacionUrl = '/core/term/snomed';  // URL to web api

    constructor(private server: Server) { }

    preferidos(id: any): Observable<ITipoPrestacion[]> {
        return this.server.get(this.tipoPrestacionUrl, { params: { id: id }, showError: true }).map(conceptos => {
            return conceptos;
        });
    }

    /**
     * Metodo get. Trae el objeto tipoPrestacion.
     * @param {any} params Opciones de busqueda
     */
    get(ids: any, conSinonimia = false): Observable<ITipoPrestacion[]> {
        return this.server.get(this.tipoPrestacionUrl, { params: { conceptIds: ids.conceptIds, conSinonimia: conSinonimia === true ? 'si' : 'no' }, showError: true }).map(conceptos => {

            let salida = [];
            let preferido;

            conceptos.forEach(element => {
                preferido = conceptos.find(x => x.conceptId === element.conceptId && (x.acceptability && x.acceptability.conceptId === '900000000000548007'));
                salida.push({
                    id: element.conceptId,
                    conceptId: element.conceptId,
                    term: element.term || element.preferredTerm,
                    fsn: element.fsn || element.fullySpecifiedName,
                    semanticTag: element.semanticTag || element.semtag,
                    nombre: element.term || element.preferredTerm,
                    acceptability: element.acceptability || false,
                    preferido: preferido ? (preferido.term === element.term ? '☆' : '') : element.preferredTerm
                });
            });

            return salida;

        });
    }
    /**
     * Metodo getById. Trae el objeto tipoPrestacion por su Id.
     * @param {String} id Busca por Id
     */
    getById(id: String): Observable<ITipoPrestacion> {
        return this.server.get(this.tipoPrestacionUrl + '/' + id, null);
    }
    /**
     * Metodo post. Inserta un objeto tipoPrestacion nuevo.
     * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
     */
    post(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
        return this.server.post(this.tipoPrestacionUrl, tipoPrestacion);
    }
    /**
     * Metodo put. Actualiza un objeto tipoPrestacion nuevo.
     * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
     */
    put(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
        return this.server.put(this.tipoPrestacionUrl + '/' + tipoPrestacion.id, tipoPrestacion);
    }
    /**
     * Metodo disable. deshabilita tipoPrestacion.
     * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
     */
    disable(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
        return this.put(tipoPrestacion);
    }
    /**
     * Metodo enable. habilita tipoPrestacion.
     * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
     */
    enable(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
        return this.put(tipoPrestacion);
    }

    searchPreferido(concept: ITipoPrestacion, prestaciones: ITipoPrestacion[]) {
        let data = prestaciones.filter(item => {
            return item.conceptId === concept.conceptId && item.acceptability.conceptId === '900000000000548007';
        });
        return data.length > 0 ? data[0] : null;
    }

}
