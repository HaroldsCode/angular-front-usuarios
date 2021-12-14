import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

import { Usuario, UsuarioLessId } from 'src/app/Schemas/Usuario.schema';
import { ErrorRes } from '../Schemas/ErrorRes.schema';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.server}/user`;

  constructor(private http: HttpClient) { }

  public getUserList() {
    try {
      return this.http.get<Usuario[]>(this.url).pipe(
        map(response =>  response )
      );
    } catch (error) {
      return this.http.get<ErrorRes>(this.url).pipe(
        map(response =>  {
          console.log(response)
          return []
        })
      );
    }
  }

  public getUsersByName(nombre:string) {
    try {
      return this.http.get<Usuario[]>(`${this.url}/${nombre}`).pipe(
        map(response =>  response )
      );
    } catch (error) {
      return this.http.get<ErrorRes>(this.url).pipe(
        map(response =>  {
          console.log(response)
          return []
        })
      );
    }
  }

  public createUser(usuario: UsuarioLessId){
    try{
      return this.http.post(this.url, usuario).pipe(
        map(() => alert('usuario creado'))
      )
    } catch (error) {
      return this.http.get<ErrorRes>(this.url).pipe(
        map(response => alert(response.message))
      );
    }
  }

  public updateUserById(id:number, usuario: UsuarioLessId){
    try{
      return this.http.put(`${this.url}/${id}`, usuario).pipe(
        map(() => alert('usuario actualizado'))
      )
    } catch (error) {
      return this.http.get<ErrorRes>(this.url).pipe(
        map(response => alert(response.message))
      );
    }
  }

  public deleteUser(id:number){
    try {
      return this.http.delete(`${this.url}/${id}`).pipe();
    } catch (error) {
      return this.http.get<ErrorRes>(this.url).pipe(
        map(response =>  {
          console.log(response)
          return []
        })
      );
    }
  }
}
