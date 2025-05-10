'use client';
import { signupFormSchema } from '@/schema/signupForm.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Logo } from '@/components/common/Logo';

export const SignupForm = () => {
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

  function onSubmit(data: z.infer<typeof signupFormSchema>) {
    console.log('submitting');
    console.log(data);
  }

  function handleGoogleSignup() {}
  return (
    <Card className="w-full max-w-sm min-w-xs p-6">
      <CardHeader>
        <CardTitle className="flex-1 shrink-0 whitespace-nowrap text-2xl flex justify-center items-center font-bold">
          Create your{' '}
          <Logo
            size={'small'}
            aspectRatio={2}
            variant={'full'}
            className={'mx-1 mb-0.5'}
          />{' '}
          Account
        </CardTitle>
      </CardHeader>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name e.g. Adiba Firoz"
                    className="rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email e.g. adiba@example.com"
                    className="rounded-xl"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    className="rounded-xl"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'gradient'}
            className="font-bold py-6 w-full text-lg"
          >
            Enter Finari
          </Button>
        </form>
      </Form>
      <CardFooter className="flex flex-col items-center">
        <div className="w-full flex items-center gap-x-4 text-muted-foreground text-sm py-4">
          <div className="flex-1 border-t border-border"></div>
          <span>OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>
        <Button className="font-bold py-6 w-full text-lg" variant={'outline'}>
          <i className="ri-google-fill"></i>
          Google
        </Button>
      </CardFooter>
    </Card>
  );
};
