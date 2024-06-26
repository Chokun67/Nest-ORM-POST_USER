import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

  @BelongsTo(() => User)
  user: User;
}
