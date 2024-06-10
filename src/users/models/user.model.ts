import { Column, Model, Table, HasOne, HasMany } from 'sequelize-typescript';
import { Address } from 'src/address/models/address.model';
import { Post } from 'src/posts/models/post.model';

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

  @HasMany(() => Post)
  posts: Post[];
}