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
  public editTask: TaskModel = new TaskModel();
  public imagesPath = environment.imagesPath;
  public isFormOpen = false;
  public isButtonDisabled = false;
  public addButtonText = 'Adicionar novo';

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

    if (this.editTask.id) {
      task.id = this.editTask.id;
      this.backRequest.putData(environment.urlBackEnd.task, task).subscribe((data: any) => {
        this.editTask = new TaskModel();
        this.onGetTasks();
      });
    } else {
      this.backRequest.postData(environment.urlBackEnd.task, task).subscribe((data: any) => {
        this.onGetTasks();
      });
    }

    this.onFormOpen();
  }

  onGetTasks(): void {
    this.backRequest.getData(environment.urlBackEnd.task).subscribe((data: any) => {
      this.taskList = data;
    });
  }

  onDelete(id?: number): void {
    if (this.onDialogOpen()) {
      this.backRequest.deleteData(environment.urlBackEnd.task, id).subscribe((data: any) => {
        this.onGetTasks();
      });
    }
  }

  onFormOpen(isEditting?: boolean): void {
    this.isButtonDisabled = !this.isButtonDisabled;
    this.isFormOpen = !this.isFormOpen;
    this.addButtonText = (this.isFormOpen) ? 'Visualizar tasks' : 'Adicionar novo';

    if (!isEditting) {
      this.editTask = new TaskModel();
    }
  }

  onEditTask(task: TaskModel): void {
    this.editTask = task;
    this.onFormOpen(true);
  }

  onFormatDate(dueDate: String): String {
    const dataString = dueDate.split('-');
    return dataString[2] + '/' + dataString[1] + '/' + dataString[0];
  }

  onDialogOpen(): boolean {
    return confirm('Deseja realmente excluir a(s) task?');
  }
}
