import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: true })
  nickname: string;

  @Column({ length: 50 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ nullable: true })
  number: number;

  @Column({ length: 50, nullable: true })
  complement: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;
}

export default Address;
