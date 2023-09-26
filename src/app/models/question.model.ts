import { Answer } from './answer.model';

export interface Question {
  id?: number;
  question: string;
  answers: Array<Answer>;
  type: string;
  points: number;
}
