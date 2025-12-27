import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { Lead } from './entities/lead.entity';
import { Activity } from './entities/activity.entity';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { CreateActivityDto } from './dto/activity.dto';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  // Contacts
  async createContact(userId: string, createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactsRepository.create({
      ...createContactDto,
      userId,
      tags: createContactDto.tags || [],
    });
    return await this.contactsRepository.save(contact);
  }

  async findAllContacts(userId: string): Promise<Contact[]> {
    return await this.contactsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneContact(id: string, userId: string): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({
      where: { id, userId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async updateContact(id: string, userId: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.findOneContact(id, userId);
    Object.assign(contact, updateContactDto);
    return await this.contactsRepository.save(contact);
  }

  async removeContact(id: string, userId: string): Promise<void> {
    const contact = await this.findOneContact(id, userId);
    await this.contactsRepository.remove(contact);
  }

  // Leads
  async createLead(userId: string, createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadsRepository.create({
      ...createLeadDto,
      userId,
    });
    return await this.leadsRepository.save(lead);
  }

  async findAllLeads(userId: string): Promise<Lead[]> {
    return await this.leadsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getLeadPipeline(userId: string) {
    const leads = await this.findAllLeads(userId);
    return {
      new: leads.filter(l => l.status === 'new'),
      contacted: leads.filter(l => l.status === 'contacted'),
      qualified: leads.filter(l => l.status === 'qualified'),
      proposal: leads.filter(l => l.status === 'proposal'),
      won: leads.filter(l => l.status === 'won'),
      lost: leads.filter(l => l.status === 'lost'),
    };
  }

  async findOneLead(id: string, userId: string): Promise<Lead> {
    const lead = await this.leadsRepository.findOne({
      where: { id, userId },
    });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead;
  }

  async updateLead(id: string, userId: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOneLead(id, userId);
    Object.assign(lead, updateLeadDto);
    return await this.leadsRepository.save(lead);
  }

  async removeLead(id: string, userId: string): Promise<void> {
    const lead = await this.findOneLead(id, userId);
    await this.leadsRepository.remove(lead);
  }

  // Activities
  async createActivity(userId: string, createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      userId,
    });
    return await this.activitiesRepository.save(activity);
  }

  async findAllActivities(userId: string): Promise<Activity[]> {
    return await this.activitiesRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }

  async findActivitiesByContact(contactId: string, userId: string): Promise<Activity[]> {
    return await this.activitiesRepository.find({
      where: { contactId, userId },
      order: { date: 'DESC' },
    });
  }

  async findActivitiesByLead(leadId: string, userId: string): Promise<Activity[]> {
    return await this.activitiesRepository.find({
      where: { leadId, userId },
      order: { date: 'DESC' },
    });
  }
}
