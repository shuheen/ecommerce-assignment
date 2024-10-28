import React, {useState} from 'react';
import {FaUserCircle, FaEye, FaEyeSlash} from 'react-icons/fa';
import {login} from './../../../services/auth'; // Adjust the path based on your structure
import {Link, useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Define the login mutation using useMutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      const userCredential = await login(email, password);
      return userCredential; // Assuming login function returns userCredential
    },
    onError: (error) => {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Error during login:', error);
    },
    onSuccess: (user) => {
      navigate('/'); // Redirect on successful login
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state
    loginMutation.mutate(); // Trigger the login mutation
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="font-extrabold text-gray-800 text-3xl text-center mb-6">ECOMMERCE APP</div>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            {error && <p className="text-red-600 text-center">{error}</p>} {/* Display error message */}
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email"
                  />
                  <FaUserCircle className="w-4 h-4 absolute right-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-4">
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4 text-gray-400" />
                    ) : (
                      <FaEye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
