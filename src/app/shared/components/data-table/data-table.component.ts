import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataTableColumn } from './data-table.types';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, SkeletonModule],
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T = any> {
  @Input() value: T[] = [];
  @Input() columns: DataTableColumn<T>[] = [];
  @Input() emptyMessage: string = 'Nenhum registro encontrado';
  @Input() isLoading!: boolean;
}
