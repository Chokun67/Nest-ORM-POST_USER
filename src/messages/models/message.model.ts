// src/messages/models/message.model.ts
import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table
export class Message extends Model {
  @ForeignKey(() => User)
  @Column
  senderId: number;

  @ForeignKey(() => User)
  @Column
  receiverId: number;

  @Column
  content: string;

  @Column({ defaultValue: false })
  isRead: boolean;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => User, 'receiverId')
  receiver: User;
}
