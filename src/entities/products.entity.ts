import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "./categories.entity";
import ProcuctToRequest from "./productToRequest.entity";

@Entity('products')
class Product{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number

    @Column({ length: 500 })
    description: string

    @Column({ length: 100 })
    image: string

    @Column({ type: 'integer' })
    quantity: number

    @ManyToOne(() => Category, categories => categories.product,{
        eager: true,
        onDelete: "SET NULL",
    })
    category: Category

    @OneToMany(() => ProcuctToRequest, productTorequest => productTorequest.product)
    productTorequest: ProcuctToRequest[]
};

export default Product;