import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'hora' })
export class HoraPipe implements PipeTransform {
    transform(value: any): any {
        return moment(value).format('HH:mm');
    }
}
