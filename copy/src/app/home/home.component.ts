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

  constructor(private backRequest: BackendRequestService<TaskModel>) { }

  ngOnInit(): void {
    this.onGetTasks();
  }

  onSubmit(event: any) {
    const task = new TaskModel();
    task.title = event.target.title.value;
    task.description = event.target.description.value;
    task.status = event.target.status.value;
    task.dueDate = event.target.dueDate.value;

    this.backRequest.postData(environment.urlBackEnd.task, task).subscribe((data: any) => {
      this.onGetTasks();
    });
  }

  onGetTasks() {
    this.backRequest.getData(environment.urlBackEnd.task).subscribe((data: any) => {
      this.taskList = data;
    });
  }

  onDelete(id?: number) {
    this.backRequest.deleteData(environment.urlBackEnd.task, id).subscribe((data: any) => {
      this.onGetTasks();
    });
  }
}
