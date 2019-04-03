import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { WebSocketService } from './websocket.service';

@Injectable()
export class WsAgendaService {

    private turneroUrl = '/modules/turnero/';  // URL to web api

    constructor(
        private server: Server,
        private ws: WebSocketService
    ) { }


    actualizarTurnosWS(agenda) {
        this.ws.emit('cambiosTurno', {agenda: agenda});
    }
    agregarTurnosWS(agenda) {
        this.ws.emit('agregarTurno', {agenda: agenda});
    }

    actualizarAgendasWS() {
        this.ws.emit('cambiosAgenda', true);
    }

    get(params: any): Observable<any> {
        return this.server.get(this.turneroUrl + 'pantalla', { params: params, showError: true });
    }

}
