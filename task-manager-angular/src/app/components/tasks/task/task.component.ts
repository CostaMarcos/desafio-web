import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Task from 'src/app/models/Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @ViewChild ('modal-edit') editModal!: ElementRef
  @ViewChild ('modal-delete') deleteModal!: ElementRef

  constructor (private service: TaskService) {}

  @Input() task: Task = {
    title: '',
    description: '',
    due_date: '',
    status: '',
  }

  isEditModalOpen: boolean = false
  isDeleteModalOpen: boolean = false
  isDescriptionModalOpen: boolean = false
  
  clickOptionOnTask(option: string) {
    console.log("TaskComponent.clickOptionOnTask()");

    console.log(option)

    if (option === "edit") {
      this.isEditModalOpen = true
    } else if (option === "delete") {
      this.isDeleteModalOpen = true
    } else if (option === "archive") {
      this.task.status = "Archived";
      this.service.put(this.task).subscribe(() => {});
    }
  }

  openDescriptionViewModal(): void {
    this.isDescriptionModalOpen = true;
  }

  cancelAction(): void {
    this.isDescriptionModalOpen = false;
  }

  getColorBadgeStatus(): string {
    switch (this.task.status) {
      case "ToDo":
        return 'blue'
      case 'Doing':
        return 'yellow'
      case 'Done':
        return 'green'
      case 'Pendent':
        return 'red'
      case 'Archived':
        return 'grey'
      default:
        return 'blue'
    }
  }
}
