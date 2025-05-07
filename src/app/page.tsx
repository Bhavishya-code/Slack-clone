"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";


 import React from 'react'

 const Home = () => {
    const { signOut } = useAuthActions();
    return (
        <div >
            LOGGED IN ...
            <Button onClick={() =>  signOut()}>Sign out</Button>
        </div>
    )
 }
 
 export default Home;
// 410056957653-m64u0sm0p90lohd33viip5vjqgo1jbj5.apps.googleusercontent.com

 

