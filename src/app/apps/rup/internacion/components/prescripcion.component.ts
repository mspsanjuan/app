import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestacionesService } from '../../../../modules/rup/services/prestaciones.service';
import { InternacionService } from '../services/internacion.service';
import { IPrestacionRegistro } from '../../../../modules/rup/interfaces/prestacion.registro.interface';
import { ElementosRUPService } from '../../../../modules/rup/services/elementosRUP.service';
@Component({
    selector: 'prescripcion',
    templateUrl: 'prescripcion.html',
    styleUrls: ['./prescripcion.scss'],

})
export class PrescripcionComponent implements OnInit {

    public prestacion;
    public frecuenciaPorRegistro: any;
    public horarios = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '01', '02', '03', '04', '05', '06'];
    public registroCompleto = [];
    constructor(private router: Router,
        public auth: Auth,
        public servicioPrestacion: PrestacionesService,
        public prestacionService: PrestacionesService,
        private route: ActivatedRoute,
        public internacionService: InternacionService,
        private elementoRupService: ElementosRUPService,
    ) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            let id = params['idPaciente'];
            this.internacionService.getUltimaPrescripcion(id).subscribe((prestacion: any) => {
                this.prestacion = prestacion;
                let unHorario = [];

                console.log(prestacion);
                if (this.prestacion.frecuencia.length > 0) {

                    this.prestacion.prescripcion[0].ejecucion.registros[0].registros.map(element => {
                        let res = element.registros.find(registro => registro.concepto.conceptId === '263490005' && registro.valor !== null);
                        if (res) {
                            this.prestacion.frecuencia[0].ejecucion.registros.map(z => {
                                console.log(z, element._id);
                                console.log();
                                let horariosEncontrados = z.registros.find(x => x.valor.idRegistroPrescripcion === element._id);
                                if (horariosEncontrados) {
                                    this.registroCompleto = [...this.registroCompleto, {
                                        registro: element,
                                        horarios: horariosEncontrados.valor.horarios
                                    }];
                                }
                            });


                        }
                    });

                    console.log(this.registroCompleto);
                } else {

                    this.prestacion.prescripcion[0].ejecucion.registros[0].registros.map(element => {
                        console.log(element);
                        let res = element.registros.find(registro => registro.concepto.conceptId === '263490005' && registro.valor !== null);
                        if (res) {
                            this.registroCompleto = [...this.registroCompleto, {
                                registro: element,
                                horarios: this.horarios.map((x: any) => {
                                    return { hora: x, utilizado: false };

                                })
                            }];
                        }
                        console.log(this.registroCompleto);
                    });
                    // console.log(prestacion[0].ejecucion.registros[0].registros);
                }


            });
        });



    }

    llenarFrecuencia(idRegistro, frecuencia) {
        // this.frecuenciaPorRegistro[idRegistro] = frecuencia;
        console.log(this.registroCompleto);
    }


    nuevaPrestacion() {
        let concepto = {
            fsn: 'sesión de informes de enfermería (procedimiento)',
            semanticTag: 'procedimiento',
            conceptId: '11553003',
            refsetIds: [
                '900000000000497000'
            ],
            term: 'sesión de informes de enfermería'
        };

        let frecuencia = {
            refsetIds: [],
            fsn: 'frecuencia (calificador)',
            semanticTag: 'calificador',
            conceptId: '272123002',
            term: 'frecuencia'
        };

        let conceptPeriodoTiempo = {
            refsetIds: [],
            fsn: 'tiempo absoluto en horas (calificador)',
            semanticTag: 'calificador',
            conceptId: '310886004',
            term: 'tiempo absoluto en horas'
        };


        this.servicioPrestacion.newPrestacion(this.prestacion.prescripcion[0].paciente, concepto).subscribe((nuevaPrestacion: any) => {
            //   let elementoR =   this.elementoRupService.getConceptoFrecuenciaPrescripcion();
            //     console.log(elementoR);
            for (let index = 0; index < this.registroCompleto.length; index++) {
                const unRegistro = this.registroCompleto[index];
                let nuevoRegistro = new IPrestacionRegistro(null, frecuencia);



                let registroPeriodosDeTiempo = new IPrestacionRegistro(null, conceptPeriodoTiempo);
                registroPeriodosDeTiempo.valor = {
                    idRegistroPrescripcion: unRegistro.registro._id,
                    horarios: unRegistro.horarios
                };
                nuevoRegistro.registros.push(registroPeriodosDeTiempo);

                nuevaPrestacion.ejecucion.registros.push(nuevoRegistro);

            }
            console.log(nuevaPrestacion);

            this.servicioPrestacion.post(nuevaPrestacion).subscribe(unaPrestacion => {
                console.log(unaPrestacion);
                // this.router.navigate(['/rup/ejecucion', prestacion.id]);
            }, (err) => {
                // this.plex.info('danger', 'La prestación no pudo ser registrada. ' + err);
            });
        });

        // else {
        //     this.servicioPrestacion.patch(this.prestacionSeleccionada.id, patch).subscribe(
        //         respuesta => {
        //         }
        //     );
        // }

    }


}

