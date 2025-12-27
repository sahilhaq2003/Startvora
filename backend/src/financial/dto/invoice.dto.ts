import { IsString, IsArray, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class InvoiceItemDto {
  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  amount: number;
}

export class CreateInvoiceDto {
  @IsString()
  clientName: string;

  @IsString()
  clientEmail: string;

  @IsOptional()
  @IsString()
  clientAddress?: string;

  @IsArray()
  items: InvoiceItemDto[];

  @IsNumber()
  subtotal: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsNumber()
  total: number;

  @IsDateString()
  dueDate: string;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientAddress?: string;

  @IsOptional()
  @IsArray()
  items?: InvoiceItemDto[];

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsEnum(['draft', 'sent', 'paid', 'overdue'])
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
