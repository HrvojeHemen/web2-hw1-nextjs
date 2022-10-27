import {useUser} from "@auth0/nextjs-auth0";
import {HStack, Text, VStack} from "@chakra-ui/react";
import {Link} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";

export default function Home() {
    const {user} = useUser();
    const [matches, setMatches] = useState([])

    async function fetchMatches() {
        let url = process.env.NEXT_DB_URL
        let token = process.env.NEXT_TOKEN
        console.log(url, token)
        const supabase = createClient(url,token)
        let error, data = await supabase
            .from('matches')
            .select()
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