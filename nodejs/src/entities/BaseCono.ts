import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, 
  DataType} from 'sequelize-typescript';

@Table({ tableName: 'basecono'})
export class BaseCono extends Model<BaseCono> {

  static foreignKeys = {};

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  bctitulo: string;

  @Column(DataType.STRING)
  bcmensaje: string;

  @Column(DataType.INTEGER)
  noactiva: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}