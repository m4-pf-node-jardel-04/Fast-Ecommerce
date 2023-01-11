import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 50 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 10 })
  number: string;

  @Column({ length: 50 })
  complement: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToOne(() => User)
  user: User;
}
