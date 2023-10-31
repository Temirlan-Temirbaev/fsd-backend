import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { StatusEnum } from "../enums/status"
import { Types } from "mongoose"

@Schema()
export class Task {
  @Prop()
  id: string;
  @Prop()
  name : string;
  @Prop()
  description : string;
  @Prop()
  status : StatusEnum
  @Prop({type : Types.ObjectId})
  user : { type : Types.ObjectId, ref : "User" }
}

export const TaskSchema = SchemaFactory.createForClass(Task);