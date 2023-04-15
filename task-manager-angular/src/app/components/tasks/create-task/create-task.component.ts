import { Component } from '@angular/core';
import Task from 'src/app/models/Task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskData: Task = {
    title: "",
    description: "",
    due_date: null,
    status: ""
  }

  constructor (private taskService: TaskService, private router: Router) {}

  createTask(): void {
    console.log("CreateTaskComponent.createTask()");

    this.taskService.post(this.taskData).subscribe(
    () => {      
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/tasks']);
      });
    },
    (error) => {
      alert(Object.values(error.error).join("\n"))
    });
  }

}
