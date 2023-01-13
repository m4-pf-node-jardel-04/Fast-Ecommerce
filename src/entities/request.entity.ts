import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import ProcuctToRequest from "./productToRequest.entity";
import User from "./user.entity";

@Entity("request")
class Request {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  date: string;

  @Column({ type: "integer", default: 0 })
  totalQuantity: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalValue: number;

  @Column({ default: "em aberto" })
  status: string;

  @ManyToOne(() => User, (user) => user.request, { nullable: true })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => ProcuctToRequest,
    (productTorequest) => productTorequest.request
  )
  productTorequest: ProcuctToRequest[];
}

export default Request;
