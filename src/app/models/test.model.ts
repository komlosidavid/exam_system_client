import { Question } from './question.model';
import { User } from './user.model';

export interface Test {
  id?: string;
  subject: string;
  opensAt: Date;
  creator: User;
  collaborators: Array<User>;
  students: Array<User>;
  finishedStudents: number;
  questions: Array<Question>;
  creationDate?: string | Date;
}
