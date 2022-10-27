import {useUser} from "@auth0/nextjs-auth0";
import {HStack, Text, VStack} from "@chakra-ui/react";
import {Link} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Home() {
    const {user} = useUser();
    const supabaseClient = useSupabaseClient()
    const [matches, setMatches] = useState([])

    async function fetchMatches() {
        const { data } = await supabaseClient.from('matches').select('*')
        console.log(data)
        return data
    }

    useEffect(() => {
        fetchMatches().then(
            matches => setMatches(matches)
        )

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