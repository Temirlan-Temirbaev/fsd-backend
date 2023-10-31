import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { Model } from "mongoose"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService) {
  }

  async register(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto)
    return this.jwtService.sign({ login: user.login })
  }

  async login(dto: CreateUserDto) {
    const candidate = await this.userModel
      .findOne({ login: dto.login })
    if (!candidate) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, candidate.password)

    if (!isCorrectPassword) {
      throw new HttpException("Uncorrect data", HttpStatus.BAD_REQUEST)
    }

    return this.jwtService.sign({ login: candidate.login })
  }

  async getByToken(token: string) {
    const tokenUser = await this.jwtService.verify(token.split(" ")[1])
    return await this.userModel.findOne({ login: tokenUser.login })
  }
}
