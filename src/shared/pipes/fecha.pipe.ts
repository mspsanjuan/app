import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'fecha' })
export class FechaPipe implements PipeTransform {
    transform(value: any): any {
        return moment(value).format('DD/MM/YYYY');
    }
}
