import React, {useState} from 'react';
import {FaUserCircle, FaEye, FaEyeSlash} from 'react-icons/fa';
import {login} from './../../../services/auth';
import {Link, useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Input from './../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Button from '../../../components/Button/Button';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const navigate = useNavigate();

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
    onSuccess: () => {
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
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  icon={<FaUserCircle className="w-4 h-4 text-gray-400" />}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  showIcon
                  icon={
                    showPassword ? (
                      <FaEye className="w-4 h-4 text-gray-400" />
                    ) : (
                      <FaEyeSlash className="w-4 h-4 text-gray-400" />
                    )
                  }
                  onClickIcon={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Checkbox
                  checked={rememberMe}
                  name="remember"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember Me"
                />
                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-orange-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <Button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Sign in
                </Button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-600 hover:underline ml-1 whitespace-nowrap font-semibold">
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
