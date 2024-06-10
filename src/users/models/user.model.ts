import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { Address } from 'src/address/models/address.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasOne(() => Address)
  address: Address;
}