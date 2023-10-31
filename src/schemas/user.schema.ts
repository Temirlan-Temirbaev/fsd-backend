import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema()
export class User {
  @Prop()
  id: string
  @Prop()
  login: string
  @Prop()
  password: string
  @Prop()
  tasks: [{ type: Types.ObjectId, ref: "Task" }]
}

export const UserSchema = SchemaFactory.createForClass(User)