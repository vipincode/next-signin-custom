'use client';
import { signin } from '@/utils/api';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function SignIn() {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signin(formState);
    } catch (error) {
      console.log(error);
    } finally {
      router.replace('/home');
      setFormState({ ...initial });
    }
  };

  return (
    <Card>
      <div className='w-full'>
        <div className='text-center'>
          <h2 className='text-3xl mb-2'>Welcome Back</h2>
          <p className='tex-lg text-black/25'>
            Enter your credentials to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='py-10 w-full'
        >
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Email</div>
            <Input
              required
              type='email'
              placeholder='Email'
              value={formState.email}
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Password</div>
            <Input
              required
              value={formState.password}
              type='password'
              placeholder='Password'
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <span>
                <Link
                  href='/register'
                  className='text-blue-600 font-bold'
                >
                  Don&apos;t have an account?
                </Link>
              </span>
            </div>
            <div>
              <Button intent='secondary'>Sign In</Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
