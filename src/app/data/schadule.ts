import { sessions } from "./sessions"

export interface schadule{
    id: 0,
    day: string,
    classId: number,
    classRoomName: string
  }
export interface tempschadule{
  day: string,
  classId: number,
  classRoomName: string,
  gradeyear:string,
  sessions:sessions
}