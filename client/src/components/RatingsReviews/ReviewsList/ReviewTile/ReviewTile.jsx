import React from 'react';
import StarRating from './StarRating';
import ReviewSummary from './ReviewSummary';
import ReviewBody from './ReviewBody';
import Recommend from './Recommend';
import ReviewResponse from './ReviewResponse';
import RatingHelpfulness from './RatingHelpfulness';
import ReviewDate from './ReviewDate';
import ReviewerName from './ReviewerName';
import Stars from '../../../Stars';

// review_id: 57340
// rating: 5
// summary: "good"
// recommend: 1
// response: null
// body: "they good!"
// date: "2019-12-04T00:00:00.000Z"
// reviewer_name: "yaboi69"
// helpfulness: 43

const ReviewTile = (props) => {
  const { review } = props;

  return (
    <div>
      <h2>
        Review #{review.review_id}
      </h2>
      <div>
        <div style={{display: "inline-block", "float": "left"}} >
          <Stars avg={review.rating} />
        </div>
        <div style={{display: "inline-block", "float": "right"}} >
          <ReviewerName reviewerName={review.reviewer_name} />
          <ReviewDate date={review.date} />
        </div>
        <br/>
      </div>
      <ReviewSummary summary={review.summary} />
      <ReviewBody body={review.body} photos={review.photos} />
      { (review.recommend > 0) ? <Recommend recommend={review.recommend} /> : <div></div> }
      { review.response ? <ReviewResponse response={review.response} /> : <div></div> }
      <RatingHelpfulness helpfulness={review.helpfulness} reviewID={review.review_id} />
    </div>
  );
};

export default ReviewTile;