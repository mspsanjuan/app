
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, ResponseContentType, RequestMethod } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { saveAs } from 'file-saver';
import { Slug } from 'ng2-slugify';

@Injectable()
export class DocumentosService {

    // URL to web api
    private pdfURL = environment.API + '/modules/descargas';
    // Usa el keymap 'default'
    private slug = new Slug('default');

    constructor(private http: Http) { }


    descargar(data): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
        });

        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob, method: RequestMethod.Post });
        return this.http.post(this.pdfURL + '/censoMensual', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    descargarV2(data): Observable<any> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
        });

        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob, method: RequestMethod.Post });
        return this.http.post(this.pdfURL + '/pdf', data, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    descargarArchivo(informe, nombreArchivo: string, headers: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.descargarV2(informe).subscribe(data => {

                if (data) {
                    // Generar descarga como PDF
                    let blob = new Blob([data], headers);
                    saveAs(blob, this.slug.slugify(`${nombreArchivo} - ${moment().format('DD-MM-YYYY-hmmss')}.pdf`));
                    return resolve(true);

                } else {
                    // Fallback a impresión normal desde el navegador
                    window.print();
                    return resolve(true);
                }
            });
        });
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
    protected extractData(res: Response) {
        return res.blob();
    }

    descargarConstanciaPuco(params): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob, method: RequestMethod.Post });

        return this.http.post(this.pdfURL + '/constanciaPuco/pdf', params, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    descargarCenso(data): Observable<any> {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('jwt') ? 'JWT ' + window.sessionStorage.getItem('jwt') : null
        });

        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob, method: RequestMethod.Post });
        return this.http.post(this.pdfURL + '/censo', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


}
