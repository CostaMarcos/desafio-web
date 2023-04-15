import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import Task from 'src/app/models/Task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  @Input() task: Task = {
    title: '',
    description: '',
    due_date: '',
    status: '',
  }

  @Input() isDeleteModalOpen: boolean = false;
  @Output() isDeleteModalOpenChange = new EventEmitter<boolean>();
  
  constructor(private taskService: TaskService, private router: Router) {}

  deleteTask() {
    console.log("DeleteTaskComponent.deleteTask()");

    this.taskService.delete(this.task).subscribe((resp) => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['tasks'])
      });
    },
    (error) => {
      console.log(error);
      alert(Object.values(error.error).join("\n"))
    })
  }

  cancelAction() {
    console.log("DeleteComponentTask.cancelAction()");
    this.isDeleteModalOpen = false;
    this.isDeleteModalOpenChange.emit(this.isDeleteModalOpen);
  }
}
