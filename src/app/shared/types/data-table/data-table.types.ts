export interface DataTableColumn<T> {
  field: keyof T | string;
  header: string;
}
