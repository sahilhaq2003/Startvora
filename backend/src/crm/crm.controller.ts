import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CrmService } from './crm.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { CreateActivityDto } from './dto/activity.dto';

@Controller('crm')
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // Contacts
  @Post('contacts')
  createContact(@Request() req, @Body() createContactDto: CreateContactDto) {
    return this.crmService.createContact(req.user.userId, createContactDto);
  }

  @Get('contacts')
  findAllContacts(@Request() req) {
    return this.crmService.findAllContacts(req.user.userId);
  }

  @Get('contacts/:id')
  findOneContact(@Request() req, @Param('id') id: string) {
    return this.crmService.findOneContact(id, req.user.userId);
  }

  @Put('contacts/:id')
  updateContact(@Request() req, @Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.crmService.updateContact(id, req.user.userId, updateContactDto);
  }

  @Delete('contacts/:id')
  removeContact(@Request() req, @Param('id') id: string) {
    return this.crmService.removeContact(id, req.user.userId);
  }

  // Leads
  @Post('leads')
  createLead(@Request() req, @Body() createLeadDto: CreateLeadDto) {
    return this.crmService.createLead(req.user.userId, createLeadDto);
  }

  @Get('leads')
  findAllLeads(@Request() req) {
    return this.crmService.findAllLeads(req.user.userId);
  }

  @Get('leads/pipeline')
  getLeadPipeline(@Request() req) {
    return this.crmService.getLeadPipeline(req.user.userId);
  }

  @Get('leads/:id')
  findOneLead(@Request() req, @Param('id') id: string) {
    return this.crmService.findOneLead(id, req.user.userId);
  }

  @Put('leads/:id')
  updateLead(@Request() req, @Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.crmService.updateLead(id, req.user.userId, updateLeadDto);
  }

  @Delete('leads/:id')
  removeLead(@Request() req, @Param('id') id: string) {
    return this.crmService.removeLead(id, req.user.userId);
  }

  // Activities
  @Post('activities')
  createActivity(@Request() req, @Body() createActivityDto: CreateActivityDto) {
    return this.crmService.createActivity(req.user.userId, createActivityDto);
  }

  @Get('activities')
  findAllActivities(@Request() req) {
    return this.crmService.findAllActivities(req.user.userId);
  }

  @Get('activities/contact/:contactId')
  findActivitiesByContact(@Request() req, @Param('contactId') contactId: string) {
    return this.crmService.findActivitiesByContact(contactId, req.user.userId);
  }

  @Get('activities/lead/:leadId')
  findActivitiesByLead(@Request() req, @Param('leadId') leadId: string) {
    return this.crmService.findActivitiesByLead(leadId, req.user.userId);
  }
}
