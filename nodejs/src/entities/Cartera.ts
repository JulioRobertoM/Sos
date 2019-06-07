import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'carteraclte'})
export class Cartera extends Model<Cartera> {

  static foreignKeys = {
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  nombretd: string;

  @Column(DataType.STRING)
  nombrecli: string;

  @Column(DataType.STRING)
  digitocli: string;

  @Column(DataType.STRING)
  direccioncli: string;

  @Column(DataType.STRING)
  numnitcar: string;

  @Column(DataType.STRING)
  numdoccli: string;

  @Column(DataType.STRING)
  telefonocli: string;

  @Column(DataType.STRING)
  emailcli: string;

  @Column(DataType.STRING)
  codciudadcli: string;

  @Column(DataType.STRING)
  comencli: string;

  @Column(DataType.STRING)
  vendedor: string;

}
