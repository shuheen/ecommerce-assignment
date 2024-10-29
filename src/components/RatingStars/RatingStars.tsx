import {RatingStarsProps} from '../../types/components/ratingStar';

export const RatingStars = ({rating}: RatingStarsProps) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <svg
        key={index}
        className={`w-5 ${index < rating ? 'fill-orange-400' : 'fill-[#CED5D8]'}`}
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
      </svg>
    ));

  return <div className="flex space-x-1">{stars}</div>;
};
