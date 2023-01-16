import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./products.entity";
import Request from "./request.entity";

@Entity("products_requests")
class ProcuctToRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column()
  productName: string;

  @ManyToOne(() => Request, (requests) => requests.productTorequest, {
    onDelete: "CASCADE",
  })
  request: Request;

  @ManyToOne(() => Product, (products) => products.productTorequest, {
    onDelete: "SET NULL",
  })
  product: Product;
}

export default ProcuctToRequest;
