import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'tablaprecios'})
export class Tablaprecio extends Model<Tablaprecio> {

  static foreignKeys = {
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  codigo: string;

  @Column(DataType.STRING)
  nombre: string;

}