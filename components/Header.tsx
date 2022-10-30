import {Center, Container, Flex, HStack, Link, Text} from "@chakra-ui/react";
import {useUser} from "@auth0/nextjs-auth0";
import {useEffect, useState} from "react";
import {fetchAdmins, fetchClubs, fetchComments, fetchMatches} from "../db/db";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {isAdmin, isAdminWithCall} from "../util/util";

export default function Header() {
    const {user} = useUser()
    const [userIsAdmin, setUserIsadmin] = useState<boolean>(false)
    const supabaseClient = useSupabaseClient()

    useEffect(() => {
        isAdminWithCall(supabaseClient, user?.email).then(
            r => setUserIsadmin(r)
        )
    }, [user])

    return (
        <Center maxW={"100%"} bgGradient={"linear(to-r," +
            "rgb(10, 235, 255)" +
            "," +
            "rgb(145, 67, 255)" +
            ")"}>
            <Flex maxWidth={"60%"} gap={"20px"}>
                <Text>{user === undefined ? null : user.email}</Text>
                <Link href={"/"}>HOME </Link>
                <Link href={"/standings"}>STANDINGS </Link>
                {user !== undefined && userIsAdmin ?
                    <Link href={"/new-match"}> NEW MATCH </Link> : null}
                {user === undefined ?
                    <Link href="/api/auth/login"> LOG IN </Link> :
                    <Link href="/api/auth/logout"> LOG OUT</Link>
                }
            </Flex>
        </Center>

    )
}