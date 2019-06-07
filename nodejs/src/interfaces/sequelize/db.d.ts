// tslint:disable
import * as Sequelize from 'sequelize';

// table: sos
export interface sosAttribute {
  id:number;
  tm:string;
  prefijo:string;
  consecutivo:number;
  pagenumber:number;
  createdAt?:Date;
  updatedAt?:Date;
}
export interface sosInstance extends Sequelize.Instance<sosAttribute>, sosAttribute { }
export interface sosModel extends Sequelize.Model<sosInstance, sosAttribute> { }

// table: geusuarios
export interface usersAttribute {
  id:number;
  login:string;
  nombre:string;
  apellido:string;
  cargo:string;
  email:string;
  password:string;
  direccion:string;
  telefono:string;
  idempresa:number;
  idrole: number;
  createdAt:Date;
  updatedAt?:Date;
}
export interface usersInstance extends Sequelize.Instance<usersAttribute>, usersAttribute { }
export interface usersModel extends Sequelize.Model<usersInstance, usersAttribute> { }

// table: cabezamov
export interface pedidosAttribute {
  id: number;
  tm: string;
  prefijo:string;
  documento:string;
  idcliente: number;
  fecha: Date;
  hora:string;
  estado:string;
  comen:Text;
  plazo:string;
  vendedor:string;
  idusuario:number;
  idtablaprecio:number;
  createdAt: Date;
  updatedAt: Date;
}
export interface pedidosInstance extends Sequelize.Instance<pedidosAttribute>, pedidosAttribute { }
export interface pedidosModel extends Sequelize.Model<pedidosInstance, pedidosAttribute> { }

// table: cuerpoped
export interface pcuerpoAttribute {
  id: number;
  idcabeza: number;
  idreferencia: number;
  cantidad: number;
  valor: number;
  estado:string;
  comencpo:Text;
  idusuario:number;
  idtablaprecio:number;
  idprecio:number;
  createdAt: Date;
  updatedAt: Date;
}
export interface pcuerpoInstance extends Sequelize.Instance<pcuerpoAttribute>, pcuerpoAttribute { }
export interface pcuerpoModel extends Sequelize.Model<pcuerpoInstance, pcuerpoAttribute> { }

// table: geclientes
export interface clientesAttribute {
  id: number;  
  codcli: string;
  nombrecli: string;
  digitocli: string;
  direccioncli: string;
  tipdoccli: string;
  numdoccli: string;
  telefonocli: string;
  emailcli: string;
  codciudadcli: string;
  comencli: Text;
  vendedor: string;
}
export interface clientesInstance extends Sequelize.Instance<clientesAttribute>, clientesAttribute { }
export interface clientesModel extends Sequelize.Model<clientesInstance, clientesAttribute> { }

// table: tablaprecios
export interface tablaprecioAttribute {
  id: number;
  codigo:string;
  nombre:string;
}
export interface tablaprecioInstance extends Sequelize.Instance<tablaprecioAttribute>, tablaprecioAttribute { }
export interface tablaprecioModel extends Sequelize.Model<tablaprecioInstance, tablaprecioAttribute> { }

// table: referencias
export interface referenciasAttribute {
  id: number;  
  codr: string;
  descr: string;
  unid: string;
  noactiva: number;
  afeinv: string;
  comentario:string;
}
export interface referenciasInstance extends Sequelize.Instance<referenciasAttribute>, referenciasAttribute { }
export interface referenciasModel extends Sequelize.Model<referenciasInstance, referenciasAttribute> { }

// table: precios
export interface preciosAttribute {
  id: number;  
  idreferencia: number;
  idtablaprecio: number;
  precio: number;
}
export interface preciosInstance extends Sequelize.Instance<preciosAttribute>, preciosAttribute { }
export interface preciosModel extends Sequelize.Model<preciosInstance, preciosAttribute> { }

export interface rolAttribute {
  id: number;  
  nombrerol: string;
}
export interface rolInstance extends Sequelize.Instance<rolAttribute>, rolAttribute { }
export interface rolModel extends Sequelize.Model<rolInstance, rolAttribute> { }

export interface menuAttribute {
  id: number;  
  codigo: string;
  depende: string;
  nombremenu: string;
}
export interface menuInstance extends Sequelize.Instance<menuAttribute>, menuAttribute { }
export interface menuModel extends Sequelize.Model<menuInstance, menuAttribute> { }

// table: basecono
export interface baseconoAttribute {
  id:number;
  bctitulo:string;
  bcmensaje:string;
  noactiva: number;
  createdAt?:Date;
  updatedAt?:Date;
}
export interface baseconoInstance extends Sequelize.Instance<baseconoAttribute>, baseconoAttribute { }
export interface baseconoModel extends Sequelize.Model<baseconoInstance, baseconoAttribute> { }
