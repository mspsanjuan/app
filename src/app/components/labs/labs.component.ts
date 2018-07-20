import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {
  
  constructor() { }
    
  ngOnInit() {
  }

  // Modelos
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;



  public mostrarMasOpciones = false;

  msg:string = '';
  
  fechaDesde;
  
  fechaHasta;
  
  prestaciones;

  profesionales;

  espacioFisico;

  estado;
  
  // Hardcodeo
  protocolos = [
    {
      id: '716852',
      fecha: '11/07/2018',
      origen:'ambulatorio',
      servicio:'clinica',
      usuario:'lmonteverde',
      solicitante:'wmolini',
      fechaRegistro:'05/07/2018',
    },
    {
      id: '516846',
      fecha: '17/07/2018',
      origen:'ambulatorio',
      servicio:'clinica',
      usuario:'lmonteverde',
      solicitante:'wmolini',
      fechaRegistro:'09/07/2018',
    },
    {
      id: '354879',
      fecha: '13/07/2018',
      origen:'guardia',
      servicio:'clinica',
      usuario:'lmonteverde',
      solicitante:'wmolini',
      fechaRegistro:'11/07/2018',
    }
  ];

    
// Funciones
  addProtocolo():void{
    this.protocolos.push(this.model);
    this.msg = 'campo agregado';
  }

  deleteProtocolo(i):void {
    var answer = confirm('Estas seguro querer eliminarlo?');
    if(answer) {
      this.protocolos.splice(i, 1);
      this.msg = 'campo eliminado';
    }
  }

  myValue;
  editProtocolo(i):void {
    this.hideUpdate = false;
    this.model2.id = this.protocolos[i].id;
    this.model2.fecha = this.protocolos[i].fecha;
    this.model2.origen = this.protocolos[i].origen;
    this.myValue = i;
  }


  updateProtocolo():void {
    let i = this.myValue;
    for(let j = 0; j < this.protocolos.length; j++){
      if(i == j) {
        this.protocolos[i] = this.model2;
        this.msg = 'campo actualizado';
        this.model2 = {};
      }
    }
  }


  loadPrestaciones(event) {

  }

  loadEspacios(event) {

  }
}
