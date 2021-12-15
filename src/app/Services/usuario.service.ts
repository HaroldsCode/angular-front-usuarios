import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, catchError } from 'rxjs/operators';

import { Usuario, UsuarioLessId } from 'src/app/Schemas/Usuario.schema';
import { ErrorRes } from '../Schemas/ErrorRes.schema';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.server}/user`;

  constructor(private http: HttpClient) { }

  public getUserList() {
    return this.http.get<Usuario[]>(this.url).pipe(
      map(response =>  response ),
      catchError(err =>  {
        alert(err.error.message);
        return []
      })
    );
  }

  public getUsersByName(nombre:string) {
    return this.http.get<Usuario[]>(`${this.url}/${nombre}`).pipe(
      map(response =>  response ),
      catchError(err => {
        alert(err.error.message);
        return []
      })
    );
  }

  public createUser(usuario: UsuarioLessId){
    return this.http.post(`${this.url}`, usuario).pipe(
      map(() => {
        alert('usuario creado');
        return 'ok';
      }),
      catchError(err => {
        alert(err.error.message);
        return '';
      })
    );
  }

  public updateUserById(id:number, usuario: UsuarioLessId){
    return this.http.put(`${this.url}/${id}`, usuario).pipe(
      map(() => {
        alert('usuario actualizado');
        return 'ok';
      }),
      catchError(err => {
        alert(err.error.message);
        return '';
      })
    );
  }

  public deleteUser(id:number){
    return this.http.delete(`${this.url}/${id}`).pipe(
      map(() => {
        alert('usuario eliminado');
        return 'ok';
      }),
      catchError(err =>  {
        alert(err.error.message);
        return '';
      })
    );
  }
}
