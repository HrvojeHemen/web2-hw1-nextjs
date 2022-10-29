import {Box, Button, Center, FormControl, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {Club} from "../classes/Club";
import {fetchAdmins, fetchClubs, fetchComments, fetchMatches} from "../db/db";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function NewMatch() {
    const [clubs, setClubs] = useState<Club[]>([])
    const supabaseClient = useSupabaseClient()

    const [club1, setClub1] = useState<Club>()
    const [club2, setClub2] = useState<Club>()
    const [points1, setPoints1] = useState<number | undefined>()
    const [points2, setPoints2] = useState<number | undefined>()
    const [matchDay, setMatchDay] = useState<number>(1)
    const [date, setDate] = useState<Date>(new Date())
    useEffect(() => {
        fetchClubs(supabaseClient).then(
            clubs => {
                setClubs(clubs)
                setClub1(clubs[0])
                setClub2(clubs[0])
            }
        )

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        if(club1.name === club2.name){
            alert("lol both clubs are the same, try again")
            return
        }

        console.log({club1:club1.name, club2:club2.name, points1, points2, date: date.toISOString().split("T")[0], matchDay})
        supabaseClient.from("matches").insert(
            {club1:club1.name, club2:club2.name, points1, points2, date: date.toISOString().split("T")[0], matchDay}
        )
            .then(value => {
                console.log(value.error)
            })
    }
    return (
        <Center maxWidth={"100%"}>
            <Box rounded={"lg"} maxWidth={"40%"}>
                <form>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor='club1'>Club 1</FormLabel>
                            <Select onChange={(event => {
                                setClub1({name: event.target.value})
                            })}>
                                {clubs.map((club) => (
                                        <option key={club.name} value={club.name}>{club.name}</option>
                                    )
                                )}
                            </Select>

                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor='club2'>Club 2</FormLabel>
                            <Select onChange={(event => {
                                setClub2({name: event.target.value})
                            })}>
                                {clubs.map((club) => (
                                        <option key={club.name} value={club.name}>{club.name}</option>
                                    )
                                )}
                            </Select>

                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor='matchDay'>Match day</FormLabel>
                            <Input type={"number"} id={"matchDay"} defaultValue={matchDay} onChange={(e) => {
                                setMatchDay(parseInt(e.target.value))
                            }}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='points1'>Goals for club 1</FormLabel>
                            <Input type={"number"} id={"points1"} defaultValue={points1} onChange={(e) => {
                                setPoints1(parseInt(e.target.value))
                            }}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='points2'>Goals for club 2</FormLabel>
                            <Input type={"number"} id={"points2"} defaultValue={points2} onChange={(e) => {
                                setPoints2(parseInt(e.target.value))
                            }}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <Input type={"date"} id={"date"} defaultValue={date.toISOString().split("T")[0]}
                                   onChange={(e) => {
                                       setDate(new Date(e.target.value))
                                   }}/>
                        </FormControl>

                        <Button type={"submit"} onClick={e => handleSubmit(e)}>SUBMIT</Button>
                    </Stack>
                </form>
            </Box>
        </Center>


    )
}