import { Column, Model, Table, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Category } from 'src/categories/models/category.model';
import { PostCategory } from 'src/categories/models/post-category.model';

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => PostCategory)
  categories: Category[];
}