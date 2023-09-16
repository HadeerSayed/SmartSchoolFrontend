export interface student{
    id :string,
    studentFirstName:string,
    gender:number,
    studentPhone:string,
    studentBirthDate:string,
    studentPhotoUrl :string,
    studentPhoto :string,
    maxDayOff :number,
    absenceDays :number,
    fees:boolean,
    gradePrice?: number,
    parentID :string,
    classRoomID :number,
    classRoomName :string,
    firstterm?:number,
    secondterm?:number
}
