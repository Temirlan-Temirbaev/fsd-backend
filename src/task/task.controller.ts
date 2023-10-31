import { Body, Controller, Delete, Headers, Param, Post, Put } from "@nestjs/common"
import { TaskService } from "./task.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { EditTaskDto } from "./dto/edit-task.dto"

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @Headers('authorization') authorizationHeader: string) {
    return this.taskService.create(dto, authorizationHeader)
  }

  @Put()
  edit(@Body() dto: EditTaskDto, @Headers('authorization') authorizationHeader: string) {
    return this.taskService.edit(dto, authorizationHeader)
  }

  @Delete(":id")
  delete(@Param("id") id: string, @Headers('authorization') authorizationHeader: string) {
    return this.taskService.delete(id, authorizationHeader)
  }
}
