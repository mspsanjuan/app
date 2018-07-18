import { Server } from '@andes/shared';
import { IProtocolo } from './../../interfaces/laboratorio/IProtocolo';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProtocoloService {
    private URL = '/modules/laboratorio/protocolos';  // URL to web api
    constructor(private server: Server) { }

    get(params: any): Observable<IProtocolo[]> {
        console.log('GET Protocolos!')
        return this.server.get(this.URL, {params: params, showError: true});
    }

    /**
     * Metodo getById. Trae el objeto LlaveTipoPrestacion por su Id.
     * @param {String} id Busca por Id
     */
    getById(id: String): Observable<IProtocolo> {
        return this.server.get(this.URL + '/' + id, null);
    }

    post(protocolo: IProtocolo): Observable<IProtocolo> {
        return this.server.post(this.URL, protocolo);
    }

    put(protocolo: IProtocolo): Observable<IProtocolo> {
        return this.server.put(this.URL + '/' + protocolo.id, protocolo);
    }

    patch(id: String, cambios: any): Observable<IProtocolo> {
        return this.server.patch(this.URL + '/' + id, cambios);
    }
}