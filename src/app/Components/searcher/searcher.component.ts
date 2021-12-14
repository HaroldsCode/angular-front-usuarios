import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Schemas/Usuario.schema';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.sass']
})
export class SearcherComponent implements OnInit {

  buscador:string = '';
  data:Usuario[] = [];

  public form:FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private sUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.getUsers()
    this.form = this.formBuilder.group(
      {
        nombre: [ '', [ Validators.required ] ],
      }
    );
  }

  public buscar (){
    if(this.form.valid){
      this.buscador = this.form.value.nombre
      this.getUsers()
    }else{
      alert("Llene el formulario")
    }
  }

  public getUsers(){
    if(!!this.buscador){
      this.sUsuario.getUsersByName(this.buscador).subscribe(usuarios => {
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
  }

  public reset(){
    this.form.patchValue({
      nombre: ''
    })
    this.buscador = '';
    this.getUsers()
  }
}
