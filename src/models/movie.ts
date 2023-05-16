import { Schema, Types, model, Model } from 'mongoose';
import { Movie } from '../interfaces/movie.interface';

const MovieSchema = new Schema<Movie>(
  {
    name: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    addedByUser: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MovieModel = model('movies', MovieSchema);

export default MovieModel;
