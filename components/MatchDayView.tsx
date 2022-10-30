import {Comment} from "../classes/Comment";
import {Match} from "../classes/Match";
import {Club} from "../classes/Club";
import {Button, Center, Container, Flex, Input, Link, Text} from "@chakra-ui/react";
import {UserProfile} from "@auth0/nextjs-auth0";
import {deleteCommentById} from "../db/db";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import NewComment from "./NewComment";

interface props {
    comments: Comment[],
    matches: Match[],
    clubs: Club[],
    matchDay: number,
    isAdmin: boolean,
    user: UserProfile
}

export default function MatchDayView(props: props) {
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    return <Container bg={"rgb(12, 98, 145)"} maxW={"100%"}>
        <Center>
            <Text color={"rgb(249, 86, 79)"}>
                Match Day {props.matchDay}
            </Text>
        </Center>
        <Flex flexDirection={"row"} gap={"20px"} justifyContent={"space-between"}>
            {/*MATCHES*/}
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"5px"} maxW={"40%"} width={"40%"}>

                {props.matches.map((match, index) =>
                    <Container key={index} bg={"rgb(255, 207, 86)"} maxW={"80%"} w={"80%"}>
                        <Text>{match.date.toISOString().split("T")[0]}</Text>
                        <Text>{match.club1} - {match.points1}</Text>
                        <Text>{match.club2} - {match.points2}</Text>
                        {props.isAdmin ? <Link href={"/edit-match/" + match.id}> EDIT MATCH </Link> : null}
                    </Container>)}
            </Flex>
            {/*COMMENTS*/}
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"5px"}  maxW={"60%"} width={"60%"}>
                {props.comments.map((comment, index) =>
                    <Container key={index} bg={"rgb(10,235,255)"}>
                        <Text>{comment.text}</Text>
                        <Text>{comment.user_email}</Text>
                        <Text>{comment.created_at.toISOString().split("T")[0]}</Text>

                        {props?.user?.email === comment.user_email ?
                            <>
                                <Link href={"/edit-match/"}> EDIT COMMENT </Link>
                                <Link onClick={() => {
                                    deleteCommentById(supabaseClient, comment['id'])
                                        .then(() => router.reload())
                                }
                                }> DELETE COMMENT </Link>
                            </>
                            : null}
                    </Container>)}
                {props.user !== undefined ?
                <Container key={-1} bg={"rgb(10,235,255)"}>
                    <NewComment matchDay={props.matchDay} user={props.user}/>
                </Container>
                    : null}
            </Flex>
        </Flex>
    </Container>

}