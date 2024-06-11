import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';
import { Category } from './category.model';

@Table
export class PostCategory extends Model<PostCategory> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}