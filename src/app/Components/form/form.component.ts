import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/Schemas/Rol.schema';
import { Usuario } from 'src/app/Schemas/Usuario.schema';
import { RolService } from 'src/app/Services/rol.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnChanges {

  @Input() usuario:Usuario = {
    id_usuario: 0,
    nombre: '',
    activo: '0',
    rol: {
      id_rol: 0,
      nombre: ''
    }
  };
  @Input() parametro:string = '';
  @Output() nuevaData = new EventEmitter<Usuario[]>();
  canEdit:boolean = false;

  title:string = '';

  data:Usuario[] = [];
  options:Rol[] = [];

  public form:FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private sUsuario: UsuarioService, private sRol: RolService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.patchValue({
      nombre: this.usuario.nombre,
      id_rol: this.usuario.rol.id_rol.toString(),
      activo: this.usuario.activo,
    });
    this.canEdit = !!this.usuario.nombre
    this.title = this.canEdit ? 'Editar usuario' : 'Crear usuario';
  }

  ngOnInit(): void {
    this.title = 'Crear usuario'
    this.sRol.getRolList().subscribe( response => {
      response.forEach(rol => {
        this.options.push(rol);
      });
    });
    this.form = this.formBuilder.group(
      {
        nombre: [ '', [ Validators.required ] ],
        id_rol: [ 0, [ Validators.required ] ],
        activo: [ '0' ]
      }
    );
    ;
  }

  public cancelar (){
    this.title = 'Crear usuario';
    this.canEdit = false;
    this.form.patchValue({
      nombre: '',
      id_rol: 0,
      activo: '0',
    })
    this.usuario = {
      id_usuario: 0,
      nombre: '',
      activo: '0',
      rol: {
        id_rol: 0,
        nombre: ''
      }
    }
    
  }

  public guardar(){
    if(this.form.valid){
      if(this.canEdit){
        this.sUsuario.updateUserById(this.usuario.id_usuario, {
          nombre: this.form.value.nombre,
          rol: {
            id_rol: this.form.value.id_rol,
            nombre: this.getNombre(this.form.value.id_rol)
          },
          activo: this.form.value.activo
        }).subscribe(() => {
          if(!!this.parametro){
            this.sUsuario.getUsersByName(this.parametro).subscribe(usuarios => {
              this.nuevaData.emit(usuarios)
            });
          }else{
            this.sUsuario.getUserList().subscribe(usuarios => {
              this.nuevaData.emit(usuarios)
            });
          }
        })
      }else{
        this.sUsuario.createUser({
          nombre: this.form.value.nombre,
          rol: {
            id_rol: this.form.value.id_rol,
            nombre: this.getNombre(this.form.value.id_rol)
          },
          activo: this.form.value.activo
        }).subscribe(() => {
          if(!!this.parametro){
            this.sUsuario.getUsersByName(this.parametro).subscribe(usuarios => {
              this.data = [];
              usuarios.forEach(usuario => {
                this.data.push(usuario)
              });
            });
          }else{
            this.sUsuario.getUserList().subscribe(usuarios => {
              this.data = [];
              usuarios.forEach(usuario => {
                this.data.push(usuario)
              });
            });
          }
        })
      }
      this.title = 'Crear usuario';
      this.form.patchValue({
        nombre: '',
        id_rol: 0,
        activo: '0',
      })
      this.usuario = {
        id_usuario: 0,
        nombre: '',
        activo: '0',
        rol: {
          id_rol: 0,
          nombre: ''
        }
      }
    }else{
      alert("Llene el formulario")
    }
  }


  public deleteUser ( id:number ) {
    const response = confirm("¿Está seguro que desea eliminar el usuario?");
    if(response) this.sUsuario.deleteUser(id).subscribe(() => {
      if(!!this.parametro){
        this.sUsuario.getUsersByName(this.parametro).subscribe(usuarios => {
          this.data = [];
          usuarios.forEach(usuario => {
            this.data.push(usuario)
          });
        });
      }else{
        this.sUsuario.getUserList().subscribe(usuarios => {
          this.data = [];
          usuarios.forEach(usuario => {
            this.data.push(usuario)
          });
        });
      }
    })
  }


  public getNombre(id:number){
    return this.options.find((op) => op.id_rol === id)?.nombre || 'Administrador';
  }
}
