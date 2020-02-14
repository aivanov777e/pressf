import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlRu extends MatPaginatorIntl {
  // itemsPerPageLabel = 'Эл-ов на странице:';
  itemsPerPageLabel = 'Элементов на странице:';
  nextPageLabel     = 'Следующая страница';
  previousPageLabel = 'Предыдущая страница';
  firstPageLabel = 'Первая страница';
  lastPageLabel = 'Последняя страница';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 из ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    // return `${startIndex + 1} – ${endIndex} of ${length}`;
    // return `${startIndex + 1} - ${endIndex} из ${length !== Number.POSITIVE_INFINITY ? length : ''}`;
    return `${startIndex + 1} - ${endIndex}${length !== Number.POSITIVE_INFINITY ? ' из ' + length : ''}`;
  }
}
