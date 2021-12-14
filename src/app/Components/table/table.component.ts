import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Schemas/Usuario.schema';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() data:Usuario[] = [];
  @Input() parametro:string = '';
  editar:Usuario = {
    id_usuario: 0,
    nombre: '',
    activo: '',
    rol: {
      id_rol: 0,
      nombre: ''
    }
  };

  constructor(private sUsuario: UsuarioService) { }

  ngOnInit(): void {
  }
  
  public editUser ( user:any ) {
    this.editar = user;
  }

  public nuevaData(nData: Usuario[]) {
    this.data = [];
    this.data = nData;
  }

  
}
