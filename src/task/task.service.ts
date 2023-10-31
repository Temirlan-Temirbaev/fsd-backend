import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Task } from "../schemas/task.schema"
import { Model } from "mongoose"
import { User } from "../schemas/user.schema"
import { JwtService } from "@nestjs/jwt"
import { CreateTaskDto } from "./dto/create-task.dto"
import { EditTaskDto } from "./dto/edit-task.dto"
import { StatusEnum } from "../enums/status"

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {
  }

  async create(dto: CreateTaskDto, authHeader: string) {
    const candidate = await this.verifyUser(authHeader);

    const task = await this.taskModel.create({
      ...dto,
      user: candidate.id,
      status: StatusEnum.NOT_FINISHED,
    })
    // @ts-ignore
    candidate.tasks.push(task._id.toString())
    await candidate.save()

    return task
  }

  async edit(dto: EditTaskDto, authHeader: string) {
    const candidate = await this.verifyUser(authHeader);

    const task = await this.taskModel.findOne({ _id: dto.taskId })
    if (!task) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND)
    }

    Object.assign(task, dto)

    await task.save()
    return task
  }

  async delete(id: string, authHeader: string) {
    const candidate = await this.verifyUser(authHeader);

    return await this.taskModel.deleteOne({ _id: id })
  }

  async verifyUser(authHeader: string) {
    const token = authHeader.split(" ")[1]
    const tokenUser = await this.jwtService.verify(token)
    const candidate = await this.userModel
      .findOne({ login: tokenUser.login })
    if (!candidate) {
      throw new UnauthorizedException("User not found")
    }
    return candidate
  }
}
