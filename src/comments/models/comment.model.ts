import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Post } from 'src/posts/models/post.model';

@Table
export class Comment extends Model<Comment> {
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
