// pages/_app.js
import React from 'react';
import {ChakraProvider} from '@chakra-ui/react'
import {UserProvider} from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </ChakraProvider>
    );
}