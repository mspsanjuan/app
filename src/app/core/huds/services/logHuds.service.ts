import { Injectable } from '@angular/core';
import { Server } from '@andes/shared';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LogHudsService {
    readonly logHudsUrl = '/core/log.v2';

    constructor(private server: Server) {
    }

    get(params?): Observable<any[]> {
        return this.server.get(this.logHudsUrl, { params: params });
    }
}
