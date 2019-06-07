import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';

@Table({ tableName: 'ge_menu'})
export class Menu extends Model<Menu> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  codigo: string;

  @Column(DataType.STRING)
  depende: string;

  @Column(DataType.STRING)
  nombremenu: string;

}