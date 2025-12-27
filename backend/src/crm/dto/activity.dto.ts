import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @IsEnum(['note', 'email', 'call', 'meeting'])
  type: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  contactId?: string;

  @IsOptional()
  @IsString()
  leadId?: string;
}
