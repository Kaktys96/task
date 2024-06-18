import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lead } from './lead.entity';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @ManyToOne(() => Lead, lead => lead.contacts, { cascade: true })
    @JoinColumn()
    lead: Lead;
}
