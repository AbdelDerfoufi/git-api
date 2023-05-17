import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { debounce, interval, throttle } from 'rxjs';
import { GithubApiResponseItem, GithubFilter } from '../github-filter';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-table',
  templateUrl: './github-table.component.html',
  styleUrls: ['./github-table.component.scss']
})
export class GithubTableComponent implements OnInit {
  data: readonly GithubApiResponseItem[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  total = 1;
  filterForm: FormGroup = new FormGroup({});
  constructor(
    private githubApi: GithubService,
    private fb: FormBuilder
  ) {
    this.initFilterForm();
  }

  ngOnInit() {
    this.fetchUsers(this.pageSize, this.pageIndex)
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      q: new FormControl(""),
      url: new FormControl(),
      type: new FormControl(""),
    })

    this.filterForm
    .valueChanges
    .pipe(debounce(() => interval(500)))
    .subscribe(() => this.fetchUsers(this.pageSize, this.pageIndex))
  }

  fetchUsers(per_page: number, page: number) {
    this.loading = true;
    this.githubApi
    .fetchUsers(per_page, page, this.filterForm.value)
    .subscribe((response) => {
      this.data = response.items;
      this.total = response.total_count;
      this.loading = false;
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, filter } = params;
    this.fetchUsers(pageSize, pageIndex);
  }
}
