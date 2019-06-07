import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Rol } from './Rol';

@Table({ tableName: 'geusuarios'})
export class User extends Model<User> {

  public static foreignKeys = {
    idrole: {ref: "rol"},
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  login: string;

  @Column(DataType.STRING)
  nombre: string;

  @Column(DataType.STRING)
  apellido: string;

  @Column(DataType.STRING)
  cargo: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  direccion: string;

  @Column(DataType.STRING)
  telefono: string;

  @Column(DataType.INTEGER)
  idempresa: number;

  @ForeignKey(() => Rol)
  public idrole: number;
  @BelongsTo(() => Rol, "idrole")
  public rol: Rol;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}