package com.syphan.hub.resources;

import com.syphan.hub.models.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskResource extends JpaRepository<Task, Long> {

}
