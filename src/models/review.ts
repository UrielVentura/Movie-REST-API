import { Schema, Types, model, Model } from 'mongoose';
import { Review } from '../interfaces/review.interface';

const ReviewSchema = new Schema<Review>(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    addedByUser: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReviewModel = model('reviews', ReviewSchema);

export default ReviewModel;
