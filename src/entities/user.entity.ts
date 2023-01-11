import { hashSync, getRounds } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  OneToOne,
} from "typeorm";
import Address  from "./addresses.entity";
import  Request from "./request.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: String;

  @Column({ length: 50 })
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedeAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isHashed = getRounds(this.password);
    if (!isHashed) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Request, (request) => request.user, { eager: true })
  request: Request[];
};

export default User;
