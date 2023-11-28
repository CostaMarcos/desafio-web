import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import Task from '../../models/Task';
import { API_URL } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private http: HttpClient) {
  }

  post(taskData: Task): Observable<Task> {
    return this.http.post<Task>(API_URL + "tasks", taskData)
  }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL + "tasks")
  }

  put(taskData: Task): Observable<Task> {
    return this.http.put<Task>(API_URL + "tasks", taskData)
  }

  delete(taskData: Task): Observable<Task> {
    return this.http.delete<Task>(API_URL + "tasks/" + taskData.id)
  }
}
