import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { UserModule } from "../user/user.module"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "../schemas/user.schema"

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET || "SECRET_KEY",
      signOptions: {
        expiresIn: "16h",
      },
    }),
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
