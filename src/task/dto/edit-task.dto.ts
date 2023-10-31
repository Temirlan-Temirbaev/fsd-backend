import { StatusEnum } from "../../enums/status"

export class EditTaskDto {
  taskId : string;
  name? : string;
  description? : string;
  status? : StatusEnum;
}