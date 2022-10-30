import {Comment} from "../classes/Comment";
import {UserProfile} from "@auth0/nextjs-auth0";
import {Button, Container, Flex, Input, Link, Text} from "@chakra-ui/react";
import {addComment, deleteCommentById, updateComment} from "../db/db";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {isAdminWithCall} from "../util/util";
import {useEffect, useState} from "react";

interface props {
    comment: Comment,
    user: UserProfile,
    index: number
}

export default function EditableComment(props: props) {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)
    useEffect(() => {
        isAdminWithCall(supabaseClient, props?.user?.email)
            .then(value => setUserIsAdmin(value))
    }, [supabaseClient, props?.user?.email])
    return (
        <Container key={props.index} bg={"rgb(10,235,255)"}>

            <Text>{props.comment.user_email} - {props.comment.created_at.toISOString().split("T")[0]}</Text>


            {/*UPDATE COMMENT - owner*/}
            {props?.user?.email === props.comment.user_email ?

                <form>
                    <Flex flexDirection={"row"}>
                        <Input type={"text"} defaultValue={props.comment.text} onChange={e => {
                            props.comment.text = e.target.value
                        }
                        }/>
                        <Button type={"submit"} onClick={(e) => {
                            e.preventDefault()
                            updateComment(supabaseClient, props.comment, props.comment['id'])
                        }}> Update </Button>
                    </Flex>

                </form>

                :
                <Text>{props.comment.text}</Text>
            }
            {/*DELETE COMMENT - owner or admin*/}
            {props?.user?.email === props.comment.user_email || userIsAdmin ?
                <Link onClick={() => {
                    deleteCommentById(supabaseClient, props.comment['id'])
                        .then(() => router.reload())
                }
                }> DELETE COMMENT </Link> : null}

        </Container>
    )
}