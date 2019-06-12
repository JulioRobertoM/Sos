import { Tablaprecios } from "./Tablaprecios";
import { Referencias } from "./Referencias";

export class Precios {
    
  id: number;
  idreferencia: number;
  producto: Referencias;
  idtablaprecio:number;
  tablaprecio: Tablaprecios;
  precio: number;

}