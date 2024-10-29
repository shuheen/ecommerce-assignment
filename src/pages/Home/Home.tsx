import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col gap-4 items-center justify-center">
      <p>Home Page</p>
      <Link to="/products" className="px-4 py-2 rounded-md bg-orange-800 text-white">
        Go to Products Page
      </Link>
    </div>
  );
};

export default Home;
