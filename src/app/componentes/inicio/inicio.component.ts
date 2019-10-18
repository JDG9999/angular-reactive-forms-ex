import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  titulo = 'Plan Prográmate';
  subtitulo = 'Ahora tú planeas cuándo serás adjudicado para tu nuevo vehículo Chevrolet.';

  constructor() { }

  ngOnInit() {
  }

}
