/* este sitve para hacert peticiones http de parte del cliente */
// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  /* asi se usa el httpclient esta variable se inicializa en el constructor private http: HttpClient */
  /*     console.log('constructor del Home hecho');
    this.http
      .get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe((resp: any) => {
        this.paises = resp;
        console.log(resp);
      });
  } */

  nuevasCanciones: any[] = [];

  loading: boolean;

  error = false;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.nuevasCanciones = data;
        this.loading = false;
      },
      (errorServicio) => {
        console.log(errorServicio);
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      }
    );
  }
}
