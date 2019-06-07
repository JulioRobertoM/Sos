import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, 
    ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Tablaprecio } from './Tablaprecio';
import { Referencias } from './Referencias';
  
@Table({ tableName: 'precios'})
export class Precios extends Model<Precios> {
  
    public static foreignKeys = {
        idreferencia: {ref: "producto"},
        idtablaprecio: {ref: "tablaprecio"},
    };
  
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;
  
    @ForeignKey(() => Referencias)
    public idreferencia: number;
    @BelongsTo(() => Referencias, "idreferencia")
    public producto: Referencias;
  
    @ForeignKey(() => Tablaprecio)
    public idtablaprecio: number;
    @BelongsTo(() => Tablaprecio, "idtablaprecio")
    public tablaprecio: Tablaprecio;
    
    @Column(DataType.INTEGER)
    public precio: number;
}