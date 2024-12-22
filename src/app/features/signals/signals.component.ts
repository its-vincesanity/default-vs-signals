import { CdkTableModule } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map } from 'rxjs';
import { DataService } from '../../shared/data.service';
@Component({
  selector: 'app-signals',
  imports: [CdkTableModule, MatSortModule],
  templateUrl: './signals.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  public readonly tableHeaders = ['name', 'value'];

  private direction: SortDirection = '';

  public hasError = signal(false);
  public readonly source = toSignal(
    this.dataService.data$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data) => {
        const sortedData =
          this.direction === 'desc'
            ? data.sort((a, b) => b.value - a.value)
            : data.sort((a, b) => a.value - b.value);
        return new MatTableDataSource(sortedData);
      }),
      catchError(() => {
        this.hasError.set(true);
        return [];
      }),
    ),
  );

  public applyDirection(sort: Sort) {
    this.direction = sort.direction;
  }
}
