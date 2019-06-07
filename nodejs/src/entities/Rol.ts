import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({ tableName: 'ge_rol'})
export class Rol extends Model<Rol> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  nombrerol: string;

}