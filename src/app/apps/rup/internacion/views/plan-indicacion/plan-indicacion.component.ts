import { Component, OnInit } from '@angular/core';
import { Plex } from '@andes/plex';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlanIndicaionService, TextoLibreConceptId } from './plan-indicacion.service';

@Component({
    selector: 'internacion-plan-indicacion',
    templateUrl: './plan-indicacion.component.html'
    // styleUrls: ['./plan-indicacion.component.scss'],
})
export class PlanIndicacionComponent implements OnInit {
    public horarios = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];
    constructor(
        private plex: Plex,
        private route: ActivatedRoute,
        private router: Router,
        private pi: PlanIndicaionService
    ) { }

    public paciente;

    ngOnInit() {
        this.plex.updateTitle([{
            route: '/',
            name: 'ANDES'
        }, {
            route: '/internacion/camas',
            name: 'Mapa de camas'
        }, {
            name: 'Plan de indicacion'
        }]);

        this.route.params.pipe(map(p => p.id)).subscribe(idPaciente => {
            this.pi.setPaciente(idPaciente);
            this.paciente = idPaciente;
        });
    }

    onAdd() {
        this.router.navigate(['rup/internacion', this.paciente, 'indicaciones', 'nueva'], { queryParams: { conceptId: TextoLibreConceptId.conceptId } });
    }

    onClickEvolucionar(indicacion, hora) {
        this.router.navigate(['rup/internacion', this.paciente, 'indicaciones', 'evolucionar'], { queryParams: { registro: indicacion.id, hora } });

    }
}


/**
 * ID de molecula de prescripcion por defecto: 5c77d6a15cd661b5039ba687
 *
 * ,
        {
            "elementoRUP" : ObjectId("5cd2e3ac5cd661b503b0911a"),
            "concepto" : {
                "conceptId" : "263490005",
                "fsn" : "estado (atributo)",
                "refsetIds" : [
                    "900000000000497000"
                ],
                "semanticTag" : "atributo",
                "term" : "estado"
            },
            "style" : {
                "columns" : 12,
                "cssClass" : "pr-0"
            },
            "params" : {
                "title" : "Estados",
                "hideHtml" : true,
                "multiline" : true,
                "required" : true
            }
        }


        // Property Decorator
function Emoji() {
  return function(target: Object, key: string | symbol) {

    let val = target[key];

    const getter = () =>  {
        return val;
    };
    const setter = (next) => {
        console.log('updating flavor...');
        val = `🍦 ${next} 🍦`;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });

  };
}


 */
