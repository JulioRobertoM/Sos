import { Rol } from "src/app/modules/sos/shared/models/Rol";

export class User {
    
  id: number;
  login: string;
  nombre: string;
  apellido: string;
  cargo: string;
  email: string;
  password: string;
  direccion: string;
  telefono: string;
  idempresa: number;
  idrole: number;
  rol: Rol;
  createdAt: Date;
  updatedAt: Date;

}