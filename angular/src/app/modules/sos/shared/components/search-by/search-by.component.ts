import { Component, OnInit, Input } from '@angular/core';
import { UTILSService } from '../../services/utils/utils.service';
import { MatTableDataSource, MatSelect } from '@angular/material';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.css']
})
export class SearchByComponent implements OnInit {

  @Input() filterColumns : Array<{name, path}> 
  @Input() dataSource : MatTableDataSource<any> | null;
  
  filterBy: { name, path };

  constructor(private UTILS: UTILSService) {}

  ngOnInit() {
    this.filterBy = this.filterColumns[0];
    this.dataSource.filterPredicate = this.UTILS.getFilterPredicate(this.filterColumns[0]);
  }

  changeFilterBy = ($event : MatSelect) => {
    this.dataSource.filterPredicate = this.UTILS.getFilterPredicate($event.value);
  };

  applyFilter = (filterValue: string) => this.UTILS.applyFilterToTable(filterValue, this.dataSource);

}