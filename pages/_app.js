// pages/_app.js
import React, {useState} from 'react';
import {ChakraProvider} from '@chakra-ui/react'
import {UserProvider} from '@auth0/nextjs-auth0';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function App({Component, pageProps}) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <ChakraProvider>
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </SessionContextProvider>
        </ChakraProvider>
    );
}