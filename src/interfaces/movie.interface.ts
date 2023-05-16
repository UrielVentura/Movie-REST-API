import { Review } from './review.interface';

export interface Movie {
  name: string;
  averageRating: number;
  addedByUser: String;
  approved: boolean;
  comments: Review[];
}

export interface InserMovie {
  name: string;
  user: string;
}
