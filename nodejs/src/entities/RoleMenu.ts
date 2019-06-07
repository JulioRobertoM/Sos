import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Menu } from './Menu';

@Table({ tableName: 'ge_rolmenu'})
export class RoleMenu extends Model<RoleMenu> {

  /*public static foreignKeys = {
    codigo: {ref: "menu"},
  };*/

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  idrole: number;

  @Column(DataType.STRING)
  codigo: string;

  /*@ForeignKey(() => Menu)
  public codigo: string;
  @BelongsTo(() => Menu, "codigo")
  public menu: Menu;*/
}