import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private URLTest: string = 'http://localhost:8080/api/v1/test/';
  private URLUser: string = 'http://localhost:8080/api/v1/user/';

  constructor(private http: HttpClient) {}

  getAllTests(page: number, size: number, filter: string): Observable<any> {
    return this.http.get(
      this.URLTest + filter + '?page=' + page + '&size=' + size
    );
  }

  createTest(payload: Test): Observable<any> {
    return this.http.post<Test>(this.URLTest, payload);
  }

  getAllTeachers(): Observable<any> {
    return this.http.get(this.URLUser + 'teachers');
  }
}
