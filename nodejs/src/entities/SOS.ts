import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';

@Table({ tableName: 'sos'})
export class SOS extends Model<SOS> {

  static foreignKeys = {};

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  tm: string;

  @Column(DataType.STRING)
  prefijo: string;

  @Column(DataType.STRING)
  consecutivo: number;

  @Column(DataType.STRING)
  pagenumber: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}