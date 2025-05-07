import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthActions } from '@convex-dev/auth/react';

import { Separator } from '@radix-ui/react-separator';
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { TriangleAlert } from 'lucide-react';


interface SignUpCardProps {
    setState: (state: SignInFlow)=> void
};

export const SignUpCard = ({setState}: SignUpCardProps) => {
     const { signIn } =useAuthActions();
    

    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [error, setErrror] = useState("");
    const [pendings, setPendings]= useState(false);

    const  onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>)=>{
                e.preventDefault();
                if(password!==confirmPassword){
                    setErrror("Passwords do not match");
                    return;
                }
                setPendings(true);
                signIn("password", {email, password, flow: "signUp" })
                .catch(()=>{
                    setErrror("Something went wrong");
                })
                .finally(()=>{
                    setPendings(false);
                } );
        };

    const onProviderSignUp = (value: "github"|"google")=>{
        setPendings(true);
        signIn(value)
          .finally(() => {
            setPendings(false);
          });
    };


  return (
    <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
           <CardTitle>Sign up to continue</CardTitle> 
           <CardDescription>
            Use your email or another service to continue
        </CardDescription>
        </CardHeader>
        {!!error && (
            <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 '>
             <TriangleAlert className="size-4"/>
             <p>{error}</p>

            </div>
        )

        }
        <CardContent className='space-y-5 px-0 pb-0'> 
        <form onSubmit={onPasswordSignUp} className="space-y-2.5  " >
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
            <Input
            disabled={pendings}
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            type='password'
            required
            />
            <Button type="submit"  className="w-full" size="lg" disabled={false}>Continue</Button>
        </form>
        <Separator />  
        
        <div className="flex flex-col gap-y-2,5">
            <Button
               disabled={pendings}
               onClick={()=>onProviderSignUp("google")}
               variant="outline"
               size="lg"
               className="w-full relative"
            >
                <FcGoogle  className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Google
            </Button>
        
            <Button
               disabled={pendings}
               onClick={()=>onProviderSignUp("github")}
               variant="outline"
               size="lg"
               className="w-full relative top-2.5 "
            >
                <FaGithub  className="size-5 absolute top-2.5 left-2.5"/>
                Continue with Github
            </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
            Already have an account?
            <span onClick={()=> setState("signIn")}   className="text-sky-700 hover:underline cursor-pointer" > Sign in</span>

        </p>
        </CardContent>
     </Card>
  );
};

