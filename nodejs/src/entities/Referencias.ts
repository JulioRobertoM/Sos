import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, 
  DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'inrefinv'})
export class Referencias extends Model<Referencias> {

  static foreignKeys = {
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  codr: string;

  @Column(DataType.STRING)
  descr: string;

  @Column(DataType.STRING)
  unid: string;

  @Column(DataType.INTEGER)
  noactiva: number;

  @Column(DataType.STRING)
  afeinv: string;

  @Column(DataType.STRING)
  comentario: string;
}