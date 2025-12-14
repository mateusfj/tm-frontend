import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Card } from 'primeng/card';
import { LeadStatusEnum } from '../../types/leads';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-leads-filters',
  standalone: true,
  imports: [FormsModule, InputTextModule, SelectModule, Card, FloatLabelModule],
  templateUrl: './leads-filters.html',
})
export class LeadsFilters {
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  @Input() status?: LeadStatusEnum;
  @Output() statusChange = new EventEmitter<LeadStatusEnum | undefined>();

  @Input() municipality: string = '';
  @Output() municipalityChange = new EventEmitter<string>();

  @Input() statusOptions: Array<{ label: string; value: LeadStatusEnum }> = [];
  @Input() municipalityOptions: Array<{ label: string; value: string }> = [];

  @Output() filtersChange = new EventEmitter<void>();

  onSearchChange(value: string): void {
    this.search = value;
    this.searchChange.emit(value);
    this.filtersChange.emit();
  }

  onStatusChange(value: LeadStatusEnum | undefined): void {
    this.status = value;
    this.statusChange.emit(value);
    this.filtersChange.emit();
  }

  onMunicipalityChange(value: string): void {
    this.municipality = value;
    this.municipalityChange.emit(value);
    this.filtersChange.emit();
  }
}
