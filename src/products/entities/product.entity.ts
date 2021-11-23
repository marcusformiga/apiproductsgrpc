import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity("produtos")
export class Product {
    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
    }
    @PrimaryColumn()
    readonly id: string
    @Column()
    name: string
    @Column()
    thumbnail: string
    @Column()
    price: number
    @CreateDateColumn()
    created_at: Date
   
}
