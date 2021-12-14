import { Rol } from './Rol.schema';

export interface Usuario {
  id_usuario: number;
  nombre:     string;
  rol:        Rol;
  activo:     string;
}

export interface UsuarioLessId {
  nombre:     string;
  rol:        Rol;
  activo:     string;
}