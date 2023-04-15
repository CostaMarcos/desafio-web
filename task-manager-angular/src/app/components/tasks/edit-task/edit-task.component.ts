import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Task from 'src/app/models/Task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: Task = {
    title: '',
    description: '',
    due_date: '',
    status: '',
  }

  @Input() isEditModalOpen: boolean = false;
  @Output() isEditModalOpenChange = new EventEmitter<boolean>()

  constructor(private taskService: TaskService, private router: Router) {}

  editTask(): void {
    console.log("EditTaskComponent.editTask()");
    
    this.taskService.put(this.task).subscribe(
    () => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['tasks'])
      });
    },
    (error) => {
      console.log(error)
      alert(Object.values(error.error).join("\n"));
    })
  }

  cancelAction(): void {
    console.log("EditTaskComponent.cancelAction()");

    this.isEditModalOpen = false;
    this.isEditModalOpenChange.emit(this.isEditModalOpen)

    this.taskService.put(this.task).subscribe(
      () => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['tasks'])
        });
      }
    );
  }
}
