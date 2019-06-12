import { User } from "./User";
import { Clientes } from "./Clientes";
import { Tablaprecios } from "./Tablaprecios";
import { CuerpoPed } from "./CuerpoPed";
import { Referencias } from "./Referencias";

export class Pedido {
    
  id: number;
  tm: string;
  prefijo:string;
  documento:string;
  idcliente: number;
  cliente: Clientes;
  fecha: Date;
  hora:string;
  estado:string;
  comen:string;
  plazo:string;
  vendedor:string;
  idusuario:number;
  usuario: User;
  idtablaprecio:number;
  tablaprecio: Tablaprecios;
  cuerpoped: Array<CuerpoPed>;
  referencia?: Array<Referencias>;
  createdAt: Date;
  updatedAt: Date;

}