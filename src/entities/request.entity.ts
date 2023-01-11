import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("request")
export class Request {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  date: string;

  @Column({ type: "integer" })
  totalQuantity: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalValue: number;

  @ManyToOne(() => User, (user) => user.request, { nullable: true })
  @JoinColumn()
  user: User;
}
