import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class BreadcrumbsService {
  breadcrumbsSubject: BehaviorSubject<any>;

  constructor() {
    this.breadcrumbsSubject = new BehaviorSubject<any>([]);
  }

  breadcrumbsObservable(): Observable<boolean> {
    return this.breadcrumbsSubject.asObservable();
  }

  setBreadcrumbs(breadcrumbs: Array<{label: string, url: string}>): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
