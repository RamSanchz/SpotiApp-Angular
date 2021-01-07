import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    /* aqui recibimos todos los parametros pasados por la url, en este caso params representa un objeto con el id dentrp */

    this.router.params.subscribe((params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loadingArtist = true;

    this.spotify.getArtista(id).subscribe((artista) => {
      console.log(artista);
      this.artista = artista;
      this.loadingArtist = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }
}
