import { User } from "./userInterface";

export interface Test {
    id: string,
    subject: string,
    creator: User,
    collaborators: Array<User>,
    students: Array<User>,
    finishedStudents: number,
    questions: Array<any>,
    creationDate: string
}