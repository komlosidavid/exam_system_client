import { User } from "./userInterface";

export interface Test {
    id: string,
    subject: string,
    creator: User,
    collaborators: Array<User>,
    questions: Array<any>,
    creationDate: string
}