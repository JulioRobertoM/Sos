import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'geclientes'})
export class Cliente extends Model<Cliente> {

  static foreignKeys = {
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.STRING)
  codcli: string;

  @Column(DataType.STRING)
  nombrecli: string;

  @Column(DataType.STRING)
  digitocli: string;

  @Column(DataType.STRING)
  direccioncli: string;

  @Column(DataType.STRING)
  tipdoccli: string;

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