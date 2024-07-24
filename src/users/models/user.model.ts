import { Column, Model, Table, HasOne, HasMany } from 'sequelize-typescript';
import { Address } from 'src/address/models/address.model';
import { Post } from 'src/posts/models/post.model';
import { Comment } from 'src/comments/models/comment.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ allowNull: true }) // เพิ่มฟิลด์รูปภาพ
  image: string;

  @HasOne(() => Address)
  address: Address;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment) // เพิ่มส่วนนี้สำหรับความสัมพันธ์กับ Comment
  comments: Comment[];
}
