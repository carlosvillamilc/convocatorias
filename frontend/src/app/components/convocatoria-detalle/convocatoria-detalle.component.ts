import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Convocatoria } from '../../models/convocatoria';


@Component({
  selector: 'app-convocatoria-detalle',
  templateUrl: './convocatoria-detalle.component.html',
  styleUrls: ['./convocatoria-detalle.component.scss']
})
export class ConvocatoriaDetalleComponent implements OnInit {

  convocatoria: Convocatoria;
  diasRestante: number;

  constructor(private convocatoriaService: ConvocatoriaService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    //Obtenemos el id de la URL
    const idConvocatoria = this.activatedRoute.snapshot.params.id;
    this.convocatoriaService.convocatoriaById(idConvocatoria).subscribe(
      res =>{
        this.convocatoria = res;
        this.diasRestante = this.calcularDiasRestantes(this.convocatoria.fechaPublicacion);
      },
      err =>{
        Swal.fire({
          title: 'Error',
          text: `Error: ${err.error.mensaje}`,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        this.atras();
      }
    );
  }

  atras(): void{
    this.router.navigate(['/']);
  }

  calcularDiasRestantes(fechaPublicacion:string): number{
    let fecha = new Date(fechaPublicacion).getTime();
    let fechaHoy = new Date().getTime();
    let diferenciaTiempo = fecha - fechaHoy
    console.log(Math.ceil(diferenciaTiempo / (1000 * 3600 * 24)));
    return Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
  }
}
