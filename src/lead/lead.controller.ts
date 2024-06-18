import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { LeadsService } from './lead.service';
import { Lead } from './entities/lead.entity';
import {CreateLeadDto} from "./dto/create-lead.dto";

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async findAll(@Query('query') query: string): Promise<Lead[]> {
    return this.leadsService.findAll(query);
  }

  @Post('create')
  async create(@Body() createLeadDto: CreateLeadDto): Promise<any> {
    return this.leadsService.create(createLeadDto);
  }

}
