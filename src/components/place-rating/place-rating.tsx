type PlaceRatingProps = {
  rating: number;
  place: string;
  children?: JSX.Element;
};

export const PlaceRating = (props: PlaceRatingProps): JSX.Element => {
  const { rating, place, children } = props;
  const placeRatingPercent = Math.round(rating) * 20;

  return (
    <div className={`${place}__rating rating`}>
      <div className={`${place}__stars rating__stars`}>
        <span style={{ width: `${placeRatingPercent}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
};
