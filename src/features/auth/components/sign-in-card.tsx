
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-separator';

interface SignInCardProps {
    setState: (state: SignInFlow)=> void
};

export const SignInCard = ({setState}: SignInCardProps) => {
    const { signIn } =useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [pendings, setPendings]= useState(false);

    const onProviderSignIn = (value: "github"|"google")=>{
        setPendings(true);
        signIn(value)
          .finally(() => {
            setPendings(false);
          });
    };
  return (
    <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
           <CardTitle>Login to continue</CardTitle> 
           <CardDescription>
            Use your email or another service to continue
        </CardDescription>
        </CardHeader>
       
        <CardContent className='space-y-5 px-0 pb-0'> 
        <form className="space-y-2.5  " action="">
            <Input
            disabled={pendings}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required
            />
            <Input
            disabled={pendings}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required
            />
            <Button type="submit"  className="w-full" size="lg" disabled={pendings}>Continue</Button>
        </form>
        <Separator />  
        
        <div className="flex flex-col gap-y-2,5">
            <Button
               disabled={pendings}
               onClick={()=>onProviderSignIn('google')}
               variant="outline"
               size="lg"
               className="w-full relative"
            >
                <FcGoogle  className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Google
            </Button>
        
            <Button
               disabled={pendings}
               onClick={()=>onProviderSignIn("github")}
               variant="outline"
               size="lg"
               className="w-full relative top-2.5 "
            >
                <FaGithub  className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Github
            </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
            Don't have an account? 
            <span onClick={()=> setState("signUp")}   className="text-sky-700 hover:underline cursor-pointer" > Sign up</span>

        </p>
        </CardContent>
     </Card>
  );
};

