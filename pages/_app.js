// pages/_app.js
import React, {useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react'
import {UserProvider} from '@auth0/nextjs-auth0';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Header from "../components/Header";

export default function App({Component, pageProps}) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <>
            <title>Premier league standings</title>
            <ChakraProvider>
                <SessionContextProvider
                    supabaseClient={supabaseClient}
                    initialSession={pageProps.initialSession}
                >
                    <UserProvider>
                        <Header/>
                        <Component {...pageProps} />
                    </UserProvider>
                </SessionContextProvider>
            </ChakraProvider>
        </>

    );
}