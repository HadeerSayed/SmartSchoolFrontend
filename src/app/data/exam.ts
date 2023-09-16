export interface examresult{
    id: number,
    firstTermGrade: number,
    secondTermGrade: number,
    total: number,
    studentId: string,
    studentName: string,
    subjectId: number,
    subjectName: string,
    classRoomName: string,
    passed: boolean,
    totalSubjectMark:number,
    year:number
}