import { CdkTableModule } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataItem } from '../../shared/data.models';
import { DataService } from '../../shared/data.service';
@Component({
  selector: 'app-signals',
  imports: [CdkTableModule, MatSortModule],
  templateUrl: './default.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultComponent implements OnInit {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  public hasError = false;
  public readonly tableHeaders = ['name', 'value'];
  public source = new MatTableDataSource<DataItem>([]);
  private direction: SortDirection = '';

  ngOnInit() {
    this.dataService.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.source.data =
          this.direction === 'desc'
            ? data.sort((a, b) => b.value - a.value)
            : data.sort((a, b) => a.value - b.value);
      },
      error: () => {
        this.hasError = true;
      },
    });
  }

  public applyDirection(sort: Sort) {
    sort.direction;
  }
}
