'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'Name is required'),
});

type RegisterInputs = z.infer<typeof registerSchema>;

type AuthFormInputs = Partial<RegisterInputs> & {
  email: string;
  password: string;
  name?: string;
};

export default function Home() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const schema = mode === 'login' ? loginSchema : registerSchema;

  const form = useForm<AuthFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', name: '' },
  });

useEffect(() => {
  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', // важливо, щоб куки пішли на сервер
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }

  checkAuth();
}, []);


const onSubmit = async (data: AuthFormInputs) => {
  setAuthError(null);
  const isLogin = mode === 'login';

  try {
    if (!isLogin) {
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!registerRes.ok) {
        const json = await registerRes.json().catch(() => ({}));
        setAuthError(json.error || 'Registration failed');
        return;
      }
    }

    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      credentials: 'include', // важливо!
    });

    if (!loginRes.ok) {
      const json = await loginRes.json().catch(() => ({}));
      setAuthError(json.error || 'Login failed after registration');
      return;
    }

    // НЕ шукаємо token у відповіді, бо він у куках
    setIsLoggedIn(true);
    form.reset();
    router.push('/categories');
  } catch {
    setAuthError('Network error');
  }
};


const handleLogout = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  setIsLoggedIn(false);
  router.push('/');
};

  return (
    <main className='flex flex-col text-center'>
      <div className='flex flex-col'>
        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            className='text-sm text-violet-500 self-end cursor-pointer hover:text-violet-600 shadow-none sm:hover:shadow-md'
          >
            Log out
          </Button>
        )}

        <h1 className={cn('text-[26px] sm:text-[48px] font-bold mb-4 sm:mb-8',{'mt-9': !isLoggedIn})}>
          Welcome to Notes App
        </h1>

        <p className='text-[16px] sm:text-[24px]'>Your thoughts. Organized.</p>

        <Image
          src='/notes-diary.png'
          alt='Notes illustration'
          width={400}
          height={400}
          className='self-center mb-16'
        />
      </div>

      {isLoggedIn ? (
        <Button
          className='max-w-140 w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
          onClick={() => router.push('/categories')}
        >
          Go to Notes
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className='max-w-140 w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'>
              {mode === 'login' ? 'Log In' : 'Register'}
            </Button>
          </DialogTrigger>
          <DialogContent className='w-full max-w-md bg-white p-6 rounded-xl shadow-lg'>
            <DialogHeader>
              <DialogTitle>
                {mode === 'login'
                  ? 'Login to Your Account'
                  : 'Create a New Account'}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-4'
              >
                {mode === 'register' && (
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Your name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='you@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='********'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {authError && (
                  <p className='text-red-600 font-semibold'>{authError}</p>
                )}

                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  className='w-full'
                >
                  {form.formState.isSubmitting
                    ? mode === 'login'
                      ? 'Logging in...'
                      : 'Registering...'
                    : mode === 'login'
                    ? 'Log In'
                    : 'Register'}
                </Button>
              </form>
            </Form>

            <div className='text-sm text-center mt-4'>
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type='button'
                    className='text-blue-600 hover:underline'
                    onClick={() => {
                      setAuthError(null);
                      setMode('register');
                      form.reset();
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type='button'
                    className='text-blue-600 hover:underline'
                    onClick={() => {
                      setAuthError(null);
                      setMode('login');
                      form.reset();
                    }}
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
