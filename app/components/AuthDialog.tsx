'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { loginUser, registerUser } from '@/lib/api';
import { Eye, EyeOff, X } from 'lucide-react';

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

type Props = {
  onAuthSuccess: () => void;
};

export const AuthDialog = ({ onAuthSuccess }: Props) => {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const schema = mode === 'login' ? loginSchema : registerSchema;
  const form = useForm<AuthFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', name: '' },
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      if (authError) setAuthError(null);
    });
    return () => subscription.unsubscribe();
  }, [form, authError]);

  const onSubmit = async (data: AuthFormInputs) => {
    setAuthError(null);

    try {
      if (mode === 'register') {
        await registerUser({
          name: data.name!,
          email: data.email,
          password: data.password,
        });
      }

      await loginUser({ email: data.email, password: data.password });

      onAuthSuccess();
      form.reset();
      router.push('/categories');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Unknown error occurred');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='max-w-140 w-full h-12 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'>
          {mode === 'login' ? 'Log In' : 'Register'}
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md bg-white p-6 rounded-xl shadow-lg border-0'>
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
                      <div className='relative'>
                        <Input placeholder='Your name' {...field} />
                        {field.value && (
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => field.onChange('')}
                            className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400 cursor-pointer'
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-300' />
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
                    <div className='relative'>
                      <Input
                        placeholder='Your name'
                        {...field}
                        className='pr-10'
                      />
                      {field.value && (
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => field.onChange('')}
                          className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400 cursor-pointer'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-300' />
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
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => setShowPassword(prev => !prev)}
                        className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400'
                      >
                        {showPassword ? (
                          <Eye className='h-4 w-4' />
                        ) : (
                          <EyeOff className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-300' />
                </FormItem>
              )}
            />

            {authError && <p className='text-red-500 text-sm'>{authError}</p>}

            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full h-12 bg-indigo-400 hover:bg-indigo-500 text-white py-2 rounded-md transition cursor-pointer'
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
  );
}