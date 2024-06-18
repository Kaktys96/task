import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Contact } from './entities/contact.entity';
import {CreateLeadDto} from "./dto/create-lead.dto";


@Injectable()
export class LeadsService {
  constructor(
      @InjectRepository(Lead)
      private readonly leadRepository: Repository<Lead>,
      @InjectRepository(Contact)
      private readonly contactRepository: Repository<Contact>,
  ) {}

  async findAll(query: string): Promise<Lead[]> {
    let leads = await this.leadRepository.find({
      relations: ['contacts'],
    });

    if (query) {
      leads = leads.filter(lead => {
        // Фильтрация по имени лида, контакта, телефону или email
        return (
            lead.name.toLowerCase().includes(query.toLowerCase()) ||
            lead.contacts.some(contact =>
                contact.name.toLowerCase().includes(query.toLowerCase()) ||
                contact.email.toLowerCase().includes(query.toLowerCase()) ||
                contact.phone.toLowerCase().includes(query.toLowerCase())
            )
        );
      });
    }

    return leads;
  }

    async create(createLeadDto: CreateLeadDto): Promise<Lead> {
        const leadData: DeepPartial<Lead> = {
            name: createLeadDto.name,
            Budget: parseInt(createLeadDto.Budget), // Преобразуйте строку в число
            Status: createLeadDto.Status,
            Responsible: createLeadDto.Responsible,
            contacts: [], // Создайте пустой массив contacts
        };
        const lead = this.leadRepository.create(leadData);

        // Создание контактов и связь с лидом
        for (const contactDto of createLeadDto.contacts) {
            const contact = this.contactRepository.create(contactDto);
            contact.lead = lead;
            await this.contactRepository.save(contact);
            leadData.contacts.push(contact);  // Добавьте контакт в массив contacts
        }

        await this.leadRepository.save(lead);
      return lead;
  }


}
