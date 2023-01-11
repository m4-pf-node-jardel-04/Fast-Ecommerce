import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./products.entity";

@Entity('categories')
class Category{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 , unique: true })
    name: string;

    @OneToMany(() => Product, products => products.category)
    product: Product[];

};

export default Category;