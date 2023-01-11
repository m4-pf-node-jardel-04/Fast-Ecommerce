import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import ProcuctToRequest from "./productToRequest.entity";
import  User  from "./user.entity";

@Entity("request")
class Request {
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

  @OneToMany(() => ProcuctToRequest, productTorequest => productTorequest.request)
  productTorequest: ProcuctToRequest[]
};

export default Request
