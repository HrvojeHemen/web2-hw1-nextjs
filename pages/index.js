import {useUser} from "@auth0/nextjs-auth0";
import {HStack, Text, VStack} from "@chakra-ui/react";
import {Link} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {supabase} from "../db/supabaseConnector";

export default function Home () {
    const {user} = useUser();
    const [matches, setMatches] = useState([])

    useEffect(async () => {
        let matchesFromDb, err = await supabase
            .from('matches')
            .select()

        setMatches(matchesFromDb)

    }, [])

    return (
        <VStack>
            <HStack>
                <Link href="/api/auth/login"> LOG IN </Link>
                <Link href="/api/auth/logout"> LOG OUT</Link>
            </HStack>
            <Text>
                {JSON.stringify(user)}
            </Text>
            <Text>
                {JSON.stringify(matches)}
            </Text>
        </VStack>

    )
}