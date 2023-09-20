import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../interfaces/testInterface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllTests(page: number, size: number): Observable<any> {
    return this.http.get(
      'http://localhost:8080/api/v1/test?page=' + page + '&size=' + size
    );
  }
}
