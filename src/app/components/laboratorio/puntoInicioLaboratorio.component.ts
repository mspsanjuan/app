// import {
//     ProtocoloService
// } from './../../services/laboratorio/protocolo.service';
import {
        PrestacionesService
    } from './../../modules/rup/services/prestaciones.service';
import { Component, OnInit, HostBinding, NgModule, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
// import {
//     Router
// } from '@angular/router';
import { Auth } from '@andes/auth';
import { Plex } from '@andes/plex';


@Component({
    selector: 'gestor-protocolos',
    templateUrl: 'puntoInicioLaboratorio.html',
    styleUrls: ['./laboratorio.scss']
})

export class PuntoInicioLaboratorioComponent

 implements OnInit {

    public showListarProtocolos = true;
    public showProtocoloDetalle = false;
    public protocolos: any = [];
    public protocolo: any = {};
    public fechaDesde: any;
    public fechaHasta: any;
    public parametros = [];


    constructor(public plex: Plex, private formBuilder: FormBuilder, 
        // public servicioProtocolo: ProtocoloService,
        public servicioPrestaciones: PrestacionesService,
        public auth: Auth) { }

    ngOnInit() {
    }
    
    // funciones
    refreshSelection(value, tipo) {
        this.parametros['tipoPrestacionSolicititud'] = '15220000';
        if (tipo === 'fechaDesde') {
            let fechaDesde = moment(this.fechaDesde).startOf('day');
            if (fechaDesde.isValid()) {
                this.parametros['fechaDesde'] = fechaDesde.isValid() ? fechaDesde.toDate() : moment().format();
                this.parametros['organizacion'] = this.auth.organizacion._id;
            }
        }
        if (tipo === 'fechaHasta') {
            let fechaHasta = moment(this.fechaHasta).endOf('day');
            if (fechaHasta.isValid()) {
                this.parametros['fechaHasta'] = fechaHasta.isValid() ? fechaHasta.toDate() : moment().format();
                this.parametros['organizacion'] = this.auth.organizacion._id;
            }
        }

        this.getProtocolos(this.parametros);
    };

    getProtocolos(params: any) {
        // this.servicioProtocolo.get(params).subscribe(protocolos => {
        // this.servicioPrestaciones.get(params).subscribe(protocolos => {
        //     protocolos.forEach( (protocolo: any) => {
        //         console.log(protocolo.solicitud);
        //         protocolo.numero = protocolo.solicitud.registros.find((reg) => {
        //             console.log(reg);
        //             return reg.nombre == "numeroProtocolo";
        //         });
        //     });
           
        //     this.protocolos = protocolos;
        // }, err => {
        //     if (err) {
        //         console.log(err);
        //     }
        // });

        this.protocolos = [{
            "paciente": {
                "id": "58da5e910bb1a96b254dda7e",
                "nombre": "MARIA LAURA",
                "apellido": "MONTEVERDE",
                "documento": "25204237",
                "sexo": "femenino",
                "fechaNacimiento": "1976-06-05T03:00:00.000Z"
            },
            "solicitud": {
                "tipoPrestacion": {
                    "refsetIds": [],
                    "fsn": "prueba de laboratorio (procedimiento)",
                    "term": "prueba de laboratorio",
                    "conceptId": "15220000",
                    "semanticTag": "procedimiento"
                },
                "organizacion": {
                    "id": "57e9670e52df311059bc8964",
                    "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON"
                },
                "profesional": {
                    "id": "5a37cfc7764a0b2a04d6df86",
                    "nombre": "MILAGROS",
                    "apellido": "VICENTELO",
                    "documento": "93240495"
                },
                "ambitoOrigen": "ambulatorio",
                "registros": [
                    {
                        "_id": "5b5892e6f851bf8b8c263efa",
                        "destacado": false,
                        "esSolicitud": false,
                        "esDiagnosticoPrincipal": false,
                        "esPrimeraVez": false,
                        "relacionadoCon": [],
                        "nombre": "prioridad",
                        "concepto": {
                            "": "pfsnrioridad (atributo)",
                            "term": "prioridad",
                            "conceptId": "260870009",
                            "semanticTag": "atributo"
                        },
                        "valor": {
                            "fsn": "ambulatorio (calificador)",
                            "term": "ambulatorio",
                            "conceptId": "255327002",
                            "semanticTag": "calificador"
                        },
                        "registros": [],
                        "createdAt": "2018-07-27T15:10:30.136Z",
                        "createdBy": {
                            "nombreCompleto": "35864378 35864378",
                            "nombre": "35864378",
                            "apellido": "35864378",
                            "username": 35864378,
                            "documento": 35864378,
                            "organizacion": {
                                "_id": "57e9670e52df311059bc8964",
                                "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                                "id": "57e9670e52df311059bc8964"
                            }
                        },
                        "updatedAt": "2018-07-26T18:39:21.363Z",
                        "updatedBy": {
                            "nombreCompleto": "35864378 35864378",
                            "nombre": "35864378",
                            "apellido": "35864378",
                            "username": 35864378,
                            "documento": 35864378,
                            "organizacion": {
                                "_id": "57e9670e52df311059bc8964",
                                "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                                "id": "57e9670e52df311059bc8964"
                            }
                        },
                        "id": "5b5892e6f851bf8b8c263efa"
                    },
                    {
                        "_id": "5b5892e6f851bf8b8c263ef9",
                        "destacado": false,
                        "esSolicitud": false,
                        "esDiagnosticoPrincipal": false,
                        "esPrimeraVez": false,
                        "relacionadoCon": [],
                        "nombre": "numeroProtocolo",
                        "concepto": {
                            "fsn": "número (calificador)",
                            "term": "número",
                            "conceptId": "260299005",
                            "semanticTag": "calificador"
                        },
                        "valor": 175,
                        "registros": [],
                        "createdAt": "2018-07-27T15:10:30.136Z",
                        "createdBy": {
                            "nombreCompleto": "35864378 35864378",
                            "nombre": "35864378",
                            "apellido": "35864378",
                            "username": 35864378,
                            "documento": 35864378,
                            "organizacion": {
                                "_id": "57e9670e52df311059bc8964",
                                "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                                "id": "57e9670e52df311059bc8964"
                            }
                        },
                        "updatedAt": "2018-07-26T18:39:21.363Z",
                        "updatedBy": {
                            "nombreCompleto": "35864378 35864378",
                            "nombre": "35864378",
                            "apellido": "35864378",
                            "username": 35864378,
                            "documento": 35864378,
                            "organizacion": {
                                "_id": "57e9670e52df311059bc8964",
                                "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                                "id": "57e9670e52df311059bc8964"
                            }
                        },
                        "id": "5b5892e6f851bf8b8c263ef9"
                    }
                ],
                "fecha": "2018-07-27T16:11:07.677Z"
            },
            "ejecucion": {
                "organizacion": {
                    "id": "57e9670e52df311059bc8964",
                    "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON"
                },
                "fecha": "2018-07-27T20:22:11.919Z",
                "registros": [
                    {
                        "_id": "5b5a15590b0ca87d04bff874",
                        "destacado": false,
                        "esSolicitud": false,
                        "esDiagnosticoPrincipal": false,
                        "esPrimeraVez": false,
                        "relacionadoCon": [],
                        "nombre": "Determinación",
                        "concepto": {
                            "fsn": "procedimiento de medición (procedimiento)",
                            "term": "procedimiento de medición",
                            "conceptId": "122869004",
                            "semanticTag": "procedimiento"
                        },
                        "registros": [
                            {
                                "_id": "5b5892e6f851bf8b8c263efc",
                                "destacado": false,
                                "esSolicitud": false,
                                "esDiagnosticoPrincipal": false,
                                "esPrimeraVez": false,
                                "relacionadoCon": [],
                                "nombre": "Hemograma",
                                "concepto": {
                                    "fsn": "hemograma completo sin fórmula diferencial (procedimiento)",
                                    "term": "hemograma completo sin fórmula diferencial",
                                    "conceptId": "43789009",
                                    "semanticTag": "procedimiento"
                                },
                                "registros": [
                                    {
                                        "_id": "5b5892e6f851bf8b8c263xxx",
                                        "destacado": false,
                                        "esSolicitud": false,
                                        "esDiagnosticoPrincipal": false,
                                        "esPrimeraVez": false,
                                        "relacionadoCon": [],
                                        "nombre": "Codigo",
                                        "concepto": {
                                            "fsn": "número (calificador)",
                                            "term": "número",
                                            "conceptId": "260299005",
                                            "semanticTag": "calificador"
                                        },
                                        "valor": 123,
                                        "registros": [],
                                        "id": "5b5892e6f851bf8b8c26xxx"
                                    },
                                    {
                                        "_id": "5b5a15590b0ca87d04bff876",
                                        "destacado": false,
                                        "esSolicitud": false,
                                        "esDiagnosticoPrincipal": false,
                                        "esPrimeraVez": false,
                                        "relacionadoCon": [],
                                        "nombre": "Determinación",
                                        "concepto": {
                                            "fsn": "procedimiento de medición (procedimiento)",
                                            "term": "procedimiento de medición",
                                            "conceptId": "122869004",
                                            "semanticTag": "procedimiento"
                                        },
                                        "registros": [
                                            {
                                                "_id": "5b5a15590b0ca87d04bff87a",
                                                "destacado": false,
                                                "esSolicitud": false,
                                                "esDiagnosticoPrincipal": false,
                                                "esPrimeraVez": false,
                                                "relacionadoCon": [],
                                                "nombre": "Globulos blancos",
                                                "concepto": {
                                                    "fsn": "recuento de leucocitos (procedimiento)",
                                                    "term": "recuento de leucocitos",
                                                    "conceptId": "767002",
                                                    "semanticTag": "procedimiento"
                                                },
                                                "registros": [{
                                                    "_id": "5b5892e6f851bf8b8c263ef9",
                                                    "destacado": false,
                                                    "esSolicitud": false,
                                                    "esDiagnosticoPrincipal": false,
                                                    "esPrimeraVez": false,
                                                    "relacionadoCon": [],
                                                    "nombre": "Codigo",
                                                    "concepto": {
                                                        "fsn": "número (calificador)",
                                                        "term": "número",
                                                        "conceptId": "260299005",
                                                        "semanticTag": "calificador"
                                                    },
                                                    "valor": 345,
                                                    "registros": [],
                                                    "id": "5b5892e6f851bf8b8c263ef9"
                                                }],
                                                "id": "5b5a15590b0ca87d04bff87a"
                                            },
                                            {
                                                "_id": "5b5892e6f851bf8b8c263eff",
                                                "destacado": false,
                                                "esSolicitud": false,
                                                "esDiagnosticoPrincipal": false,
                                                "esPrimeraVez": false,
                                                "relacionadoCon": [],
                                                "nombre": "Globulos rojos",
                                                "concepto": {
                                                    "fsn": "recuento de eritrocitos (procedimiento)",
                                                    "term": "recuento de eritrocitos",
                                                    "conceptId": "14089001",
                                                    "semanticTag": "procedimiento"
                                                },
                                                "valor": "",
                                                "registros": [],
                                                "id": "5b5892e6f851bf8b8c263eff"
                                            },
                                            {
                                                "_id": "5b5892e6f851bf8b8c263efe",
                                                "destacado": false,
                                                "esSolicitud": false,
                                                "esDiagnosticoPrincipal": false,
                                                "esPrimeraVez": false,
                                                "relacionadoCon": [],
                                                "nombre": "Hemoglobina",
                                                "concepto": {
                                                    "fsn": "medición de hemoglobina S (procedimiento)",
                                                    "term": "medición de hemoglobina S",
                                                    "conceptId": "271510004",
                                                    "semanticTag": "procedimiento"
                                                },
                                                "valor": "",
                                                "registros": [],
                                                "id": "5b5892e6f851bf8b8c263efe"
                                            },
                                            {
                                                "_id": "5b5892e6f851bf8b8c263efd",
                                                "destacado": false,
                                                "esSolicitud": false,
                                                "esDiagnosticoPrincipal": false,
                                                "esPrimeraVez": false,
                                                "relacionadoCon": [],
                                                "nombre": "Hematócrito",
                                                "concepto": {
                                                    "fsn": "medición del hematócrito (procedimiento)",
                                                    "term": "medición del hematócrito",
                                                    "conceptId": "250231008",
                                                    "semanticTag": "procedimiento"
                                                },
                                                "valor": "",
                                                "registros": [{
                                                    "_id": "5b5892e6f851bf8b8c263xxx",
                                                    "destacado": false,
                                                    "esSolicitud": false,
                                                    "esDiagnosticoPrincipal": false,
                                                    "esPrimeraVez": false,
                                                    "relacionadoCon": [],
                                                    "nombre": "Codigo",
                                                    "concepto": {
                                                        "fsn": "número (calificador)",
                                                        "term": "número",
                                                        "conceptId": "260299005",
                                                        "semanticTag": "calificador"
                                                    },
                                                    "valor": 234,
                                                    "registros": [],
                                                    "id": "5b5892e6f851bf8b8c263xxx"
                                                }],
                                                "id": "5b5892e6f851bf8b8c263efd"
                                            }
                                        ],
                                        "id": "5b5a15590b0ca87d04bff876"
                                    }
                                ],
                                "id": "5b5892e6f851bf8b8c263efc"
                            }
                        ],
                        "createdAt": "2018-07-26T18:39:21.363Z",
                        "createdBy": {
                            "nombreCompleto": "35864378 35864378",
                            "nombre": "35864378",
                            "apellido": "35864378",
                            "username": 35864378,
                            "documento": 35864378,
                            "organizacion": {
                                "_id": "57e9670e52df311059bc8964",
                                "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                                "id": "57e9670e52df311059bc8964"
                            }
                        },
                        "id": "5b5a15590b0ca87d04bff874"
                    }
                ]
            },
            "_id": "5b5a15590b0ca87d04bff871",
            "createdBy": {
                "organizacion": {
                    "id": "57e9670e52df311059bc8964",
                    "contacto": [],
                    "edificio": [],
                    "activo": true,
                    "tipoEstablecimiento": {
                        "id": "5894b7e04633bf3dbc04312b",
                        "_id": "5894b7e04633bf3dbc04312b",
                        "nombre": "Hospital"
                    },
                    "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                    "_id": "57e9670e52df311059bc8964"
                },
                "documento": 25204237,
                "username": 25204237,
                "apellido": "Monteverde ",
                "nombre": "Laura ",
                "nombreCompleto": "Laura  Monteverde "
            },
            "createdAt": "2017-10-05T17:55:32.992Z",
            "estados": [
                {
                    "idOrigenModifica": null,
                    "_id": "59d672141257070cb4404196",
                    "createdBy": {
                        "organizacion": {
                            "id": "57e9670e52df311059bc8964",
                            "contacto": [],
                            "edificio": [],
                            "activo": true,
                            "tipoEstablecimiento": {
                                "id": "5894b7e04633bf3dbc04312b",
                                "_id": "5894b7e04633bf3dbc04312b",
                                "nombre": "Hospital"
                            },
                            "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                            "_id": "57e9670e52df311059bc8964"
                        },
                        "documento": 25204237,
                        "username": 25204237,
                        "apellido": "Monteverde ",
                        "nombre": "Laura ",
                        "nombreCompleto": "Laura  Monteverde "
                    },
                    "createdAt": "2017-10-05T17:55:32.990Z",
                    "tipo": "ejecucion",
                    "updatedAt": "2018-07-26T18:39:21.363Z",
                    "updatedBy": {
                        "nombreCompleto": "35864378 35864378",
                        "nombre": "35864378",
                        "apellido": "35864378",
                        "username": 35864378,
                        "documento": 35864378,
                        "organizacion": {
                            "_id": "57e9670e52df311059bc8964",
                            "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                            "id": "57e9670e52df311059bc8964"
                        }
                    },
                    "id": "59d672141257070cb4404196"
                }
            ],
            "updatedAt": "2018-07-26T18:39:21.364Z",
            "updatedBy": {
                "nombreCompleto": "35864378 35864378",
                "nombre": "35864378",
                "apellido": "35864378",
                "username": 35864378,
                "documento": 35864378,
                "organizacion": {
                    "_id": "57e9670e52df311059bc8964",
                    "nombre": "HOSPITAL PROVINCIAL NEUQUEN - DR. EDUARDO CASTRO RENDON",
                    "id": "57e9670e52df311059bc8964"
                }
            },
            "id": "5b5a15590b0ca87d04bff871"
        }];
    }

    estaSeleccionado(protocolo) {
        return false;
    }

    verProtocolo(protocolo, multiple, e) {
        // Si se presionó el boton suspender, no se muestran otros protocolos hasta que se confirme o cancele la acción.
        
            if (protocolo && protocolo.id) {
                // this.serviceAgenda.getById(agenda.id).subscribe(ag => {
                    this.protocolo = protocolo;
                    this.showListarProtocolos = false;
                    this.showProtocoloDetalle = true;
            // }
        }
    }

    volverLista () {
        this.protocolo = null;
        this.showListarProtocolos = true;
        this.showProtocoloDetalle = false;
    }

    loadSectores (e) {
        return {};
    }

    loadAreasValidacion (e) {
        return {};
    }

    loadEfectores (e) {
        return {};
    }

  // Funciones
//   addProtocols():void{
//     this.protocolos.push(this.model);
//     this.msg = 'campo agregado';
//   }


    // myValue;
    // editProtocolo(i):void {
    //   this.model2.id = this.protocols[i].id;
    //   this.model2.fecha = this.protocols[i].fecha;
    //   this.model2.origen = this.protocols[i].origen;
    //   this.myValue = i;
    // }


    // Agragadas para que no pinche
    addProtocolo(event){

    }

    loadSector(event){
        return [];
    }
    loadOrigenes(event){
        return [];
    }
    
}



