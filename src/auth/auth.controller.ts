import { Body, Controller, Get, Post, Headers} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../user/dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }

  @Post("login")
  login(@Body() dto: CreateUserDto): Promise<string> {
    return this.authService.login(dto)
  }

  @Get()
  getByToken(@Headers("authorization") token: string) {
    return this.authService.getByToken(token)
  }
}
