import { Column, Model, Table, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Category } from 'src/categories/models/category.model';
import { PostCategory } from 'src/categories/models/post-category.model';
import { Comment } from 'src/comments/models/comment.model';

@Table
export class Post extends Model<Post> {
  @Column
  title: string;

  @Column
  content: string;

  @Column({ allowNull: true })
  image: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Category, () => PostCategory)
  categories: Category[];

  @HasMany(() => Comment)
  comments: Comment[];
}
