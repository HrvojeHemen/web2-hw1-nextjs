import {UserProfile} from "@auth0/nextjs-auth0";
import {useState} from "react";
import {Button, Container, Flex, Input} from "@chakra-ui/react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {addComment} from "../db/db";
import {useRouter} from "next/router";

interface props {
    matchDay: number,
    user: UserProfile,
}

export default function NewComment(props: props) {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const [text, setText] = useState<string>()

    return (

        <form>
            <Flex flexDirection={"row"}>
                <Input type={"text"} onChange={e => {
                    setText(e.target.value)
                }}/>
                <Button type={"submit"} onClick={(e) => {
                    e.preventDefault()
                    console.log(text)
                    addComment(supabaseClient, {
                        text: text,
                        matchDay: props.matchDay,
                        user_email: props.user.email,
                        created_at: undefined
                    }).then(() => router.reload())
                }
                }>
                    Reply
                </Button>
            </Flex>
        </form>


    )
}