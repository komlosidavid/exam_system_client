import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private URLTest: string = 'http://localhost:8080/api/v1/test';
  private URLUser: string = 'http://localhost:8080/api/v1/user/';

  constructor(private http: HttpClient) {}

  getAllTests(page: number, size: number, filter: string): Observable<any> {
    return this.http.get(
      this.URLTest + '/' + filter + '?page=' + page + '&size=' + size
    );
  }

  createTest(payload: Test): Observable<any> {
    return this.http.post<any>(this.URLTest, payload);
  }

  getAllUsersByRole(role: string): Observable<any> {
    return this.http.get(this.URLUser + 'get?role=' + role);
  }

  getAllUsersByContainingNameAndRole(name: string, role: string) {
    return this.http.get<Array<User>>(
      this.URLUser + 'get?name=' + name + '&role=' + role
    );
  }

  getAllTestsBySubjectName(subject: string) {
    return this.http.get<Array<Test>>(this.URLTest + '/get?subject=' + subject);
  }

  getTestById(id: string): Observable<Test> {
    return this.http.get<Test>(this.URLTest + '/test/' + id);
  }
}
