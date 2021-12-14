import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

import { Rol } from 'src/app/Schemas/Rol.schema';
import { ErrorRes } from '../Schemas/ErrorRes.schema';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = `${environment.server}/rol`;

  constructor(private http: HttpClient) { }

  public getRolList() {
    try {
      return this.http.get<Rol[]>(this.url).pipe(
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
}
