import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableDataConfig } from '../../interfaces/model/table-data-config.interface';
import { UiService } from '../../services/ui.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [CommonModule, DatePipe, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: ITableDataConfig[] = [];
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter<any>;

  constructor(public uiservice: UiService) {
  }

  removeItem(item: ITableDataConfig) {
    this.deleteRecord.emit(item);
  }


}
