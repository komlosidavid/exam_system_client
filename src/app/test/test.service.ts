import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private URLTest: string = 'http://localhost:8080/api/v1/test';

  constructor(private http: HttpClient) {}

  getTestById(id: string): Observable<Test> {
    return this.http.get<Test>(this.URLTest + '/test/' + id);
  }
}
