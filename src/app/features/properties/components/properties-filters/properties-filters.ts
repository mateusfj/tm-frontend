import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-properties-filters',
  standalone: true,
  imports: [FormsModule, InputTextModule, SelectModule, Card],
  templateUrl: './properties-filters.html',
})
export class PropertiesFilters {
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  @Input() municipality: string = '';
  @Output() municipalityChange = new EventEmitter<string>();

  @Input() crop?: string;
  @Output() cropChange = new EventEmitter<string | undefined>();

  @Input() leadId: string = '';
  @Output() leadIdChange = new EventEmitter<string>();

  @Input() cropsOptions: Array<{ label: string; value: string }> = [];
  @Input() leads: Array<{ id: string; name: string }> = [];

  @Output() filtersChange = new EventEmitter<void>();

  onSearchChange(value: string): void {
    this.search = value;
    this.searchChange.emit(value);
    this.filtersChange.emit();
  }

  onMunicipalityChange(value: string): void {
    this.municipality = value;
    this.municipalityChange.emit(value);
    this.filtersChange.emit();
  }

  onCropChange(value: string | undefined): void {
    this.crop = value;
    this.cropChange.emit(value);
    this.filtersChange.emit();
  }

  onLeadIdChange(value: string): void {
    this.leadId = value;
    this.leadIdChange.emit(value);
    this.filtersChange.emit();
  }
}
