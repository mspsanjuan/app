import { Plex } from '@andes/plex';
import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Auth } from '@andes/auth';
import { AppComponent } from './../../app.component';

@Component({
    selector: 'chartito',
    templateUrl: 'chart.html'
})
export class ChartComponent implements AfterViewInit {
    @HostBinding('class.plex-layout') layout = true;
    public chart = {
        dataset: [{
            label: 'My First dataset',
            data: [
                2,
                23,
                45,
                12,
                28,
                12,
                32
            ],
        }],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        options: {

        },
        colors: [{ pointBackgroundColor: 'grey' }]
    };

    constructor(public auth: Auth, public appComponent: AppComponent) { }

    ngAfterViewInit() {
        window.setTimeout(() => {
        });
    }
}
