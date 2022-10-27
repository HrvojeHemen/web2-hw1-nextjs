import {useUser} from "@auth0/nextjs-auth0";
import {HStack, VStack} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'

export default function Home() {
    const {user} = useUser();
    return (
        <VStack>
            <HStack>
                <Link href="/api/auth/login" > LOG IN </Link>
                <Link href="/api/auth/logout"> LOG OUT</Link>
            </HStack>

            <div>
                {JSON.stringify(user)}
            </div>
        </VStack>

    )
}