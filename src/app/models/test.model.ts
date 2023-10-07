import { Question } from "./question.model";
import { User } from "./user.model";


export interface Test {
    id?: number,
    subject: string,
    opensAt: Date,
    creator: string,
    collaborators: Array<User>,
    students: Array<User>,
    finishedStudents: number,
    questions: Array<Question>,
    creationDate?: string
}