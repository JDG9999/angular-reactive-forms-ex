import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  servicios = {
    paises: {
      url: 'https://restcountries.eu/rest/v2/all'
    }
  }

  constructor(
    private http: HttpClient
  ) { }

  consultarURL(nomServicio: string, params: any): Observable<any> {
    const reqHeaders = new HttpHeaders();
    reqHeaders.append('Content-Type', 'application/json');
    const reqParams = new HttpParams(params || '');
    const options = { headers: reqHeaders, params: reqParams };
    return this.http.get<any>(
      this.servicios[nomServicio].url, options)
      .pipe(
        tap(_ => this.registrar(`Se ejecutó la consulta ${nomServicio} con el arg ${params}`)),
        catchError(this.manejarError<any>(nomServicio, null))
      );

  }

  private manejarError<T>(operacion = 'operacion', resultado?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.registrar(`${operacion} falló: ${error.message}`);
      return of(resultado as T);
    };
  }

  private registrar(mensaje: string) {
    console.log(mensaje);
  }

}
