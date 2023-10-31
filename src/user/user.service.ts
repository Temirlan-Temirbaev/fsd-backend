import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { Model } from "mongoose"
import { CreateUserDto } from "./dto/create-user.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userModel
      .findOne({ login: dto.login })

    if (candidate) {
      throw new HttpException("This user already exists", HttpStatus.SEE_OTHER)
    }

    const hashedPassword = await bcrypt.hash(dto.password, 6)

    return await this.userModel
      .create({ login: dto.login, password: hashedPassword })
  }
}
