import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, 
  ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Cliente } from './Cliente';
import { User } from './User';
import { Tablaprecio } from './Tablaprecio';
import { Cuerpoped } from './Cuerpoped';

@Table({ tableName: 'cabezamov'})
export class Pedido extends Model<Pedido> {

  public static foreignKeys = {
    idcliente: {ref: "cliente"},
    idusuario: {ref: "usuario"},
    idtablaprecio: {ref: "tablaprecio"},
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column(DataType.STRING)
  public tm: string;

  @Column(DataType.STRING)
  public prefijo: string;

  @Column(DataType.STRING)
  public documento: string;

  @ForeignKey(() => Cliente)
  public idcliente: number;
  @BelongsTo(() => Cliente, "idcliente")
  public cliente: Cliente;

  @Column(DataType.DATE)
  public fecha: Date;

  @Column(DataType.STRING)
  public hora: string;

  @Column(DataType.STRING)
  public estado: string;

  @Column(DataType.STRING)
  public comen: string;

  @Column(DataType.STRING)
  public plazo: string;

  @Column(DataType.STRING)
  public vendedor: string;

  @ForeignKey(() => Tablaprecio)
  public idtablaprecio: number;
  @BelongsTo(() => Tablaprecio, "idtablaprecio")
  public tablaprecio: Tablaprecio;

  @ForeignKey(() => User)
  public idusuario: number;
  @BelongsTo(() => User, "idusuario")
  public usuario: User;

  @HasMany(() => Cuerpoped)
  public cuerpoped: Cuerpoped[];

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

}