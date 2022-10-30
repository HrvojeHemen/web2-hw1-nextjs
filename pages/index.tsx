import {useUser} from "@auth0/nextjs-auth0";
import {Container, Link, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Match} from "../classes/Match";
import {Comment} from "../classes/Comment";
import {Club} from "../classes/Club";
import MatchDayView from "../components/MatchDayView";
import {fetchAdmins, fetchClubs, fetchComments, fetchMatches} from "../db/db";
import is from "@sindresorhus/is";
import boolean = is.boolean;
import {isAdmin} from "../util/util";


export default function Home() {
    const {user} = useUser();
    const supabaseClient = useSupabaseClient()
    const [matches, setMatches] = useState<Match[]>([])
    const [admins, setAdmins] = useState<string[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [clubs, setClubs] = useState<Club[]>([])
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)

    async function addRowToTable(tableName: string, object: Object) {
        return supabaseClient.from(tableName).insert(object).select();
    }


    function getAllMatchDays(): number[] {
        let matchDaysSet = new Set<number>()
        for (let i = 0; i < matches.length; i++) {
            let md = matches[i].matchDay
            matchDaysSet.add(md)
        }
        return [...matchDaysSet].sort()
    }

    function getCommentsForMatchDay(matchDay: number) {
        return comments.filter(value => value.matchDay === matchDay)
    }

    function getMatchesForMatchDay(matchDay: number) {
        return matches.filter(value => value.matchDay === matchDay)
    }

    useEffect(() => {
        if (user === undefined || admins === undefined) return
        isAdmin(admins, user.email)
            .then(is => {
                setUserIsAdmin(is)
            })
    }, [user, admins])

    useEffect(() => {


        fetchMatches(supabaseClient).then(
            matches => {
                for (let i = 0; i < matches.length; i++) {
                    if (matches[i].date) matches[i].date = new Date(matches[i].date)
                }
                setMatches(matches)
            }
        )
        fetchAdmins(supabaseClient).then(
            admins => {
                setAdmins(admins.map(value => value.email))
            }
        )
        fetchComments(supabaseClient).then(
            comments => {
                for (let i = 0; i < comments.length; i++) {
                    comments[i].created_at = new Date(comments[i].created_at)
                }
                setComments(comments)
            }
        )
        fetchClubs(supabaseClient).then(
            clubs => setClubs(clubs)
        )

    }, [])

    return (
        <VStack w={"100%"}>
            <Container maxW={"100%"}>
                {
                    getAllMatchDays().map(matchDay =>
                        <MatchDayView comments={getCommentsForMatchDay(matchDay)}
                                      matches={getMatchesForMatchDay(matchDay)} clubs={clubs}
                                      matchDay={matchDay} key={matchDay}
                                      isAdmin={userIsAdmin}
                                      user={user}
                        />
                    )
                }
            </Container>
        </VStack>

    )
}