import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PeticionesService } from 'src/app/servicios/peticiones.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  inscripcionForm: FormGroup;
  paises: string[];

  titulo = 'TÍTULO';
  subtitulo = 'Subtítulo';
  tituloCondiciones = 'Política de privacidad';
  textoCondiciones = 'Esta es la política de privacidad';
  datosFormulario = {
    nombre: {
      etiqueta: 'Nombre completo',
      validadores: [Validators.required, Validators.pattern('^[a-zA-Z´áéíóúñÁÉÍÓÚÑ\\s]+$')]
    },
    tipoDoc: {
      etiqueta: 'Tipo de documento',
      validadores: [Validators.required],
      opciones: ['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte'],
    },
    numDoc: {
      etiqueta: 'Número de documento',
      validadores: [Validators.required, Validators.pattern('^[0-9]{7,10}$')]
    },
    pais: {
      etiqueta: 'País',
      validadores: [Validators.required]
    },
    celular: {
      etiqueta: 'Celular',
      validadores: [Validators.required, Validators.pattern('^[0-9]{10}$')]
    },
    correo: {
      etiqueta: 'Correo electrónico',
      validadores: [Validators.required, Validators.email]
    },
    condiciones: {
      validadores: [Validators.requiredTrue]
    }
  };

  constructor(
    private peticionesServicio: PeticionesService,
    private modalServicio: NgbModal
  ) { }

  ngOnInit() {
    this.obtenerPaises();
    this.crearFormulario();
  }

  obtenerPaises(): void {
    this.peticionesServicio.consultarURL('paises', null)
      .subscribe((respuesta) => {
        this.paises = respuesta.map((pais) => {
            return pais.name;
          });
      });
  }

  crearFormulario(): void {
    this.inscripcionForm = new FormGroup({
      nombre: new FormControl(null, this.datosFormulario.nombre.validadores),
      tipoDoc: new FormControl(null, this.datosFormulario.tipoDoc.validadores),
      numDoc: new FormControl(null, this.datosFormulario.numDoc.validadores),
      pais: new FormControl(null, this.datosFormulario.pais.validadores),
      celular: new FormControl(null, this.datosFormulario.celular.validadores),
      correo: new FormControl(null, this.datosFormulario.correo.validadores),
      condiciones: new FormControl(null, this.datosFormulario.condiciones.validadores)
    });
  }

  existeEntrada(fc: string): boolean {
    return this.inscripcionForm.get(fc).value !== null && this.inscripcionForm.get(fc).value !== '';
  }

  abrirModal(contenido) {
    this.modalServicio
      .open(contenido, { ariaLabelledBy: 'titulo-modal', scrollable: true });
  }

  alEnviar() {
    if (this.inscripcionForm.valid) {

    }
  }

}
