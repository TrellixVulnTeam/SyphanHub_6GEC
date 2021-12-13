class TaskModel {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdDate: string;
  updatedDate: string;

  constructor(
    id?: number,
    title?: string,
    description?: string,
    status?: string,
    dueDate?: string,
    createdDate?: string,
    updatedDate?: string)
  {
    this.id = id || 0;
    this.title = title || '';
    this.description = description || '';
    this.status = status || '';
    this.dueDate = dueDate || '';
    this.createdDate = createdDate || '';
    this.updatedDate = updatedDate || '';
  }
}

export default TaskModel;
