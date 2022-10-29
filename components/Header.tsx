import {Center, Container, Flex, HStack, Link} from "@chakra-ui/react";
import {useUser} from "@auth0/nextjs-auth0";
import {useEffect, useState} from "react";
import {fetchAdmins, fetchClubs, fetchComments, fetchMatches} from "../db/db";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Header() {
    const {user} = useUser()
    const [admins, setAdmins] = useState<string[]>([])
    const supabaseClient = useSupabaseClient()

    useEffect(() => {

        fetchAdmins(supabaseClient).then(
            admins => setAdmins(admins.map(value => value.email))
        )

    }, [])

    function isAdmin(): boolean {
        for (let i = 0; i < admins.length; i++) {

            if (admins[i] === user.email) return true
        }
        return false
    }

    return (
        <Center maxW={"100%"} bgGradient={"linear(to-r,rgb(10, 235, 255),rgb(145, 67, 255))"}>
            <Flex maxWidth={"60%"} gap={"20px"} >
                <Link href={"/"}>HOME </Link>
                <Link href={"/standings"}>STANDINGS </Link>
                {user !== undefined && isAdmin() ? <Link href={"/new-match"}> NEW MATCH </Link> : null}
                {user === undefined ?
                    <Link href="/api/auth/login"> LOG IN </Link> :
                    <Link href="/api/auth/logout"> LOG OUT</Link>
                }
            </Flex>
        </Center>

    )
}