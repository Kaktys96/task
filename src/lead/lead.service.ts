import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Contact } from './entities/contact.entity';
import {CreateContactDto, CreateLeadDto} from "./dto/create-lead.dto";


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

    async create(createLeadDto: CreateLeadDto, createContactDto: CreateContactDto): Promise<Lead> {
        const lead = new Lead();
        lead.name = createLeadDto.name;
        lead.Budget = parseFloat(createLeadDto.Budget.replace(',', '.')) || 0;
        lead.Status = createLeadDto.Status;
        lead.Responsible = createLeadDto.Responsible;

        // Создаем и заполняем контакты
        lead.contacts = createLeadDto.contacts.map((contactDto: CreateContactDto) => {
            const contact = new Contact();
            contact.name = contactDto.name;
            contact.email = contactDto.email;
            contact.phone = contactDto.phone;
            return contact;
        });

        return this.leadRepository.save(lead);
    }
  }



