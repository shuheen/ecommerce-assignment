// pages/Register.tsx
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {register} from '../../../services/auth';
import {Link} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import {FaEye, FaEyeSlash, FaUserCircle} from 'react-icons/fa';
import Form from '../../../components/Form/Form';
import {showErrorToast, showSuccessToast} from '../../../utils/toastUtils';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accept, setAccept] = useState<boolean>(false);

  const mutation = useMutation(({email, password}: {email: string; password: string}) => register(email, password), {
    onSuccess: () => {
      showSuccessToast('Registration successful! Please log in.');
    },
    onError: () => {
      showErrorToast('Registration failed. Please try again.');
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match.');
      return;
    }

    mutation.mutate({email, password});
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="font-extrabold text-gray-800 text-3xl text-center mb-6">ECOMMERCE APP</div>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
            <Form onSubmit={handleRegister}>
              <Input
                name="username"
                type="text"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                showIcon={true}
                icon={<FaUserCircle className="w-4 h-4 text-gray-400" />}
              />
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showIcon={true}
                icon={
                  showPassword ? (
                    <FaEyeSlash className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FaEye className="w-4 h-4 text-gray-400" />
                  )
                }
                onClickIcon={() => setShowPassword((prev) => !prev)}
              />
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showIcon={true}
              />
              <Checkbox
                name="terms"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                label="I accept the terms and conditions."
              />
              <Button type="submit">Register</Button>
            </Form>
            <div className="mt-4 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-700">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
