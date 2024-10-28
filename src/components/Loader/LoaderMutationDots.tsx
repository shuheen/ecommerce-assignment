import {MutatingDots} from 'react-loader-spinner';

const LoaderMutationDots = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#1c4283"
        secondaryColor="#182c4f"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span className="text-lg font-bold text-gray-500">Loading...</span>
    </div>
  );
};

export default LoaderMutationDots;
