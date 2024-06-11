import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';
import { PostCategory } from './post-category.model';


@Table
export class Category extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Post, () => PostCategory)
  posts: Post[];
}