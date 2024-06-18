import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Lead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    Budget: number;

    @Column()
    Status: string;

    @Column()
    Responsible: string;

    @Column({ type: 'timestamp with time zone', default: () => 'NOW()' })
    date_create: Date;


    @OneToMany(() => Contact, contact => contact.lead, { cascade: true })
    @JoinTable()
    contacts: Contact[];
}
