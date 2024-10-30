import ReviewsSummary from '../../../components/ReviewsSummary/ReviewsSummary';

const Reviews = () => (
  <div className="mt-8 lg:col-span-2">
    <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
    <div className="space-y-3 mt-4">
      <ReviewsSummary rating={5} percentage={66} />
      <ReviewsSummary rating={4} percentage={33} />
      <ReviewsSummary rating={3} percentage={16} />
      <ReviewsSummary rating={2} percentage={8} />
      <ReviewsSummary rating={1} percentage={6} />
    </div>
  </div>
);

export default Reviews;
