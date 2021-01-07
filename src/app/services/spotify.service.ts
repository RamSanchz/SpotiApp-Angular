import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* los observables vienen de rxjs(reactive extencion) y estos son map, filter, etc*/
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('spotify service listo');
  }

  /* peticon api spoti */
  getQuery(query: string): any {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQC8LzIdarmFESPJTx-n7tPaeUSttY_Ee1rPIxAxw5PKopY3soN0lT2LhsHDmSq1nHMiB4YD9wfkTzDt2gg',
    });

    return this.http.get(url, { headers });
  }

  /* peticion home */
  getNewReleases(): any {
    return this.getQuery('browse/new-releases?LIMIT=20').pipe(
      map((data) => data['albums'].items)
    );
  }

  /* peticion search */
  getArtistas(termino: string): any {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }

  /* peticion artista */
  getArtista(id: string): any {
    return this.getQuery(`artists/${id}`);
    // .pipe(
    //   map((data: any) => data.artists.items)
    // );
  }

  /* Canciones destacadas del artista */
  getTopTracks(id: string): any {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data['tracks'])
    );
  }
}
