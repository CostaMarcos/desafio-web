import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import Task from 'src/app/models/Task';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild ('editModal') editModal!: ElementRef
  @ViewChild ('deleteModal') deleteModal!: ElementRef
  tasks: Task[] = []

  selectedTask: Task = {
    title: '',
    description: '',
    due_date: '',
    status: ''
  }

  isEditModalOpen: boolean = false
  isDeleteModalOpen: boolean = false
  
  constructor (private taskService: TaskService, private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    console.log("TasksComponent.ngOnInit()");
    this.getTasks();
  }

  logout(): void {
    console.log('TasksComponent.logout()');
    this.authService.logout();
  }

  getTasks(): void {
    console.log('TasksComponents.getTasks()');
    this.taskService.get().subscribe(
    (tasks: Task[]) => {
      this.tasks = tasks;
    },
    (error: any) => {
      console.log(error)
      this.router.navigate(['/login'])
    });
  }
}
