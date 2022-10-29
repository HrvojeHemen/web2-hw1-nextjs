import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";
import {Match} from "../classes/Match";
import {Club} from "../classes/Club";
import {fetchClubs, fetchMatches} from "../db/db";
import {Center, Container, Flex, Text} from "@chakra-ui/react";
import {useUser} from "@auth0/nextjs-auth0";

export default function Standings() {
    const {user} = useUser();
    const supabaseClient = useSupabaseClient()

    const [matches, setMatches] = useState<Match[]>([])
    const [clubs, setClubs] = useState<Club[]>([])

    useEffect(() => {

        fetchClubs(supabaseClient).then(
            clubs => {
                setClubs(clubs)
                fetchMatches(supabaseClient).then(
                    matches => {
                        for (let i = 0; i < matches.length; i++) {
                            if (matches[i].date) matches[i].date = new Date(matches[i].date)
                        }
                        setMatches(matches)
                    }
                )
            }

        )

    }, [])

    function prepareForViewing(): { name: string, points: number, goalDiff: number }[] {
        let map = new Map<string, number[]>()
        for (let i = 0; i < clubs.length; i++) {
            map.set(clubs[i].name, [0,0])
        }
        for (let i = 0; i < matches.length; i++) {
            let match = matches[i]
            let cl1Name = match.club1
            let cl2Name = match.club2

            let cl1Score = match.points1
            let cl2Score = match.points2
            if (cl1Score && cl2Score) {
                let togive1 = 1
                let togive2 = 1

                if (cl1Score > cl2Score) {
                    togive1 = 3
                    togive2 = 0
                } else if (cl2Score > cl1Score) {
                    togive1 = 0
                    togive2 = 3
                }

                map.set(
                    cl1Name,
                    [map.get(cl1Name)[0] + togive1, map.get(cl1Name)[1] + cl1Score - cl2Score]
                )
                map.set(
                    cl2Name,
                    [map.get(cl2Name)[0] + togive2, map.get(cl2Name)[1] + cl2Score - cl1Score]
                )
            }
        }


        let ret = []
        for (const mapElement of map) {
            ret.push({
                name: mapElement[0],
                points: mapElement[1][0],
                goalDiff: mapElement[1][1]
            })
        }
        return ret
    }


    return (
        <Container>
            <Flex flexDirection={"column"} gap={"20px"} justifyContent={"space-between"}>
                {prepareForViewing().sort((a, b) => b.points - a.points != 0 ? b.points - a.points : b.goalDiff - a.goalDiff).map(value =>
                    <Container key={value.name} bg={"rgb(255, 207, 86)"}>
                        <Text>
                            {value.points} - {value.name}
                        </Text>
                    </Container>
                )}
            </Flex>
        </Container>

    )

}
