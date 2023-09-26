import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllTests(page: number, size: number, filter: string): Observable<any> {
    return this.http.get(
      'http://localhost:8080/api/v1/test/' +
        filter +
        '?page=' +
        page +
        '&size=' +
        size
    );
  }

  createTest(payload: Test): Observable<any> {
    return this.http.post<Test>("http://localhost:8080/api/v1/test", payload);
  }
}
