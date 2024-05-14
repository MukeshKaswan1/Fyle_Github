import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  itemsPerPage: number = 10;
  currentPage: number = 1;
  pages!: Array<number> | null;
  @Input() totalPages = 1;
  @Input() totalItems = 1;
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() newItemEvent2 = new EventEmitter<number>();
  dropdownVisible: boolean = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  changePage(value: number) {
    this.newItemEvent.emit(value);
  }
  changeItems(value: number) {
    this.newItemEvent2.emit(value);
    this.dropdownVisible = false;
  }
}
