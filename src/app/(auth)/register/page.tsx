'use client';
import { register } from '@/utils/api';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function Register() {
  const [formState, setFormState] = useState({ ...initial });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await register(formState);
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
          <h2 className='text-3xl mb-2'>Create a new Account</h2>
          <p className='tex-lg text-black/25'>
            Just a few things to get started
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='py-10 w-full'
        >
          <div className='flex mb-8 justify-between'>
            <div className='pr-2'>
              <div className='text-lg mb-4 ml-2 text-black/50'>First Name</div>
              <Input
                required
                placeholder='First Name'
                value={formState.firstName}
                className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                onChange={(e: { target: { value: any } }) =>
                  setFormState((s) => ({ ...s, firstName: e.target.value }))
                }
              />
            </div>
            <div className='pl-2'>
              <div className='text-lg mb-4 ml-2 text-black/50'>Last Name</div>
              <Input
                required
                placeholder='Last Name'
                value={formState.lastName}
                className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                onChange={(e: { target: { value: any } }) =>
                  setFormState((s) => ({ ...s, lastName: e.target.value }))
                }
              />
            </div>
          </div>
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
                  href='/signin'
                  className='text-blue-600 font-bold'
                >
                  Already have an account?
                </Link>
              </span>
            </div>
            <div>
              <Button intent='secondary'>Register</Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
