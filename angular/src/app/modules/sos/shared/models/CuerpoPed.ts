import { User } from "./User";
import { Tablaprecios } from "./Tablaprecios";
import { Referencias } from "./Referencias";
import { Pedido } from "./Pedidos";
import { Precios } from "./Precios";

export class CuerpoPed {
    
  id: number;
  idcabeza?: number;
  cabeza: Pedido;
  idreferencia: number;
  referenciacpo?: Referencias;
  cantidad: number;
  valor: number;
  unidad: string;
  piva: number;
  codiva: string;
  descto: number;
  comencpo: string;
  estado: string;
  idusuario: number;
  usuario: User;
  idtablaprecio: number;
  tablaprecio: Tablaprecios;
  idprecio: number;
  precio?: Precios;
  createdAt: Date;
  updatedAt: Date;

}