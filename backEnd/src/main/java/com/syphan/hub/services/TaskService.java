package com.syphan.hub.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.syphan.hub.models.Task;
import com.syphan.hub.repositories.TaskRepository;

@RestController
@RequestMapping("/task")
public class TaskService {

  @Autowired
  TaskRepository taskResource;

  @GetMapping()
  public List<Task> getTask() {
    return taskResource.findAll();
  }

  @GetMapping("/{id}")
  public Optional<Task> getTask(@PathVariable(value = "id") Long id) {
    return taskResource.findById(id);
  }

  @PostMapping()
  public Task createTask(@RequestBody Task task) {
    LocalDateTime now = LocalDateTime.now();
    task.setCreatedDate(now);
    task.setUpdatedDate(now);
    return taskResource.save(task);
  }

  @DeleteMapping("/{id}")
  public void deleteTask(@PathVariable(value = "id") Long id) {
    taskResource.deleteById(id);
  }

  @DeleteMapping()
  public void deleteAllTask() {
    taskResource.deleteAll();
  }

  @PutMapping()
  public Task updateTask(@RequestBody Task task) {
    return taskResource.save(task);
  }
}
