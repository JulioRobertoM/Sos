import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, 
    ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Tablaprecio } from './Tablaprecio';
import { Referencias } from './Referencias';
import { Pedido } from './Pedido';
import { Precios } from './Precios';
  
  @Table({ tableName: 'cuerpomov'})
  export class Cuerpoped extends Model<Cuerpoped> {
  
    public static foreignKeys = {
      idusuario: {ref: "usuario"},
      idreferencia: {ref: "referencia"},
      idtablaprecio: {ref:"tablaprecio"},
      idprecio: {ref:"precio"},
    };
  
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id: number;
  
    @ForeignKey(() => Pedido)
    public idcabeza?: number;
    @BelongsTo(() => Pedido, 'idcabeza')
    public cabeza: Pedido;

    @ForeignKey(() => Referencias)
    public idreferencia: number;
    @BelongsTo(() => Referencias, "idreferencia")
    public referencia: Referencias;

    @Column(DataType.INTEGER)
    public cantidad: number;

    @Column(DataType.INTEGER)
    public valor: number;

    @Column(DataType.STRING)
    public estado: string;
  
    @Column(DataType.STRING)
    public comencpo: string;
  
    @ForeignKey(() => Tablaprecio)
    public idtablaprecio: number;
    @BelongsTo(() => Tablaprecio, "idtablaprecio")
    public tablaprecio: Tablaprecio;
  
    @ForeignKey(() => User)
    public idusuario: number;
    @BelongsTo(() => User, "idusuario")
    public usuario: User;

    @ForeignKey(() => Precios)
    public idprecio: number;
    @BelongsTo(() => Precios, "idprecio")
    public precio: Precios;
  
    @CreatedAt
    public createdAt: Date;
  
    @UpdatedAt
    public updatedAt: Date;
  
  }