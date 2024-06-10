import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Address extends Model {
  @Column
  street: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  zipCode: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
