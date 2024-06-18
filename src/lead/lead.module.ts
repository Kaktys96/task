import { Module } from '@nestjs/common';
import { LeadsService } from './lead.service';
import { LeadsController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Contact])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
