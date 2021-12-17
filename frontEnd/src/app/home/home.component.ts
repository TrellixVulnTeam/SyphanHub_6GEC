import { environment } from 'src/environments/environment';
import { BackendRequestService } from '../backendRequest/backend-request.service';
import { Component, OnInit } from '@angular/core';
import TaskModel from '../models/TaskModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public taskList: TaskModel[] = [];
  public isFormOpen = false;
  public imagesPath = environment.imagesPath;

  constructor(private backRequest: BackendRequestService<TaskModel>) { }

  ngOnInit(): void {
    this.onGetTasks();
  }

  onSubmit(event: any): void {
    const task = new TaskModel();
    task.title = event.target.title.value;
    task.description = event.target.description.value;
    task.status = event.target.status.value;
    task.dueDate = event.target.dueDate.value;

    this.backRequest.postData(environment.urlBackEnd.task, task).subscribe((data: any) => {
      this.onGetTasks();
    });

    this.onFormOpen();
  }

  onGetTasks(): void {
    this.backRequest.getData(environment.urlBackEnd.task).subscribe((data: any) => {
      this.taskList = data;
      console.log(data);
    });
  }

  onDelete(id?: number): void {
    this.backRequest.deleteData(environment.urlBackEnd.task, id).subscribe((data: any) => {
      this.onGetTasks();
    });
  }

  onFormOpen(): void {
    this.isFormOpen = !this.isFormOpen;
  }
}
