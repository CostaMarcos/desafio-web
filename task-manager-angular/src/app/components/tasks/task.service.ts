import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import Task from '../../models/Task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private readonly API: string = 'http://localhost:8000'
  constructor(private http: HttpClient) {
  }

  post(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.API + "/tasks", taskData)
  }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API + "/tasks")
  }

  put(taskData: Task): Observable<Task> {
    return this.http.put<Task>(this.API + "/tasks", taskData)
  }

  delete(taskData: Task): Observable<Task> {
    return this.http.delete<Task>(this.API + "/tasks/" + taskData.id)
  }
}
