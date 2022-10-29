import {Comment} from "../classes/Comment";
import {Match} from "../classes/Match";
import {Club} from "../classes/Club";
import {Container, Flex, Text} from "@chakra-ui/react";

interface props {
    comments: Comment[],
    matches: Match[],
    clubs: Club[],
    matchDay: number
}

export default function MatchDayView(props: props) {
    return <Container bg={"rgb(12, 98, 145)"} maxW={"60%"}>
        <Text color={"rgb(249, 86, 79)"}>
            Match Day {props.matchDay}
        </Text>
        <Flex flexDirection={"row"} gap={"20px"} justifyContent={"space-between"}>

            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"5px"}>
                {props.matches.map((match, index) =>
                    <Container key={index} bg={"rgb(255, 207, 86)"}>
                        <Text>{match.date.toISOString().split("T")[0]}</Text>
                        <Text>{match.club1} - {match.points1}</Text>
                        <Text>{match.club2} - {match.points2}</Text>
                    </Container>)}
            </Flex>

            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"5px"}>
                {props.comments.map((comment, index) =>
                    <Container key={index} bg={"rgb(10,235,255)"}>
                        <Text>{comment.text}</Text>
                        <Text>{comment.user_email}</Text>
                        <Text>{comment.created_at.toISOString().split("T")[0]}</Text>
                    </Container>)}
            </Flex>
        </Flex>
    </Container>

}