import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from './contact.entity';
import { Product } from './product.entity';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Contact)
    @JoinColumn({name: 'contact_id'})
    contact: Contact;

    @ManyToOne(() => Product)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column({type: 'date'})
    dateDebut: Date;

    @Column({type: 'date'})
    dateFin: Date;
}