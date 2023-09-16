export interface request{
    id?:number,
    studentFirstName: string,
    studentEmail: string,
    studentGender: number,
    studentPhone: string,
    studentBirthDate: Date,
    address: string,
    parentFullName: string,
    parentEmail: string,
    parentPhone: string,
    IdentityParentPhoto:string,
    StudentPhoto:string,
    studentPhotoUrl: string,
    identityParentPhotoUrl: string,
    StudentBirthCertPhotoUrl:string,
    StudentBirthCertPhoto:string,
    password: string
}