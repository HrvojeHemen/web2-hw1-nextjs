import {Match} from "../classes/Match";
import {Comment} from "../classes/Comment";

export async function fetchMatches(supabaseClient) {
    return fetchAllFromTable(supabaseClient,"matches")
}

export async function fetchAdmins(supabaseClient) {
    return fetchAllFromTable(supabaseClient,"admins")
}

export async function fetchComments(supabaseClient) {
    return fetchAllFromTable(supabaseClient,"comments")
}

export async function fetchClubs(supabaseClient) {
    return fetchAllFromTable(supabaseClient,"clubs")
}

async function fetchAllFromTable(supabaseClient, tableName: string) {
    const {data} = await supabaseClient.from(tableName).select('*')
    return data
}

export async function fetchMatchById(supabaseClient, matchId: number): Promise<Match>{
    const {data} = await supabaseClient.from("matches").select().eq("id", matchId)
    return data[0]
}

export async function deleteCommentById(supabaseClient, commentId: number) {
    await supabaseClient.from("comments").delete().eq("id", commentId)
}

export async function addMatch(supabaseClient, match: Match): Promise<any>{
    return supabaseClient.from("matches").insert(
        {
            club1: match.club1,
            club2: match.club2,
            points1 : match.points1,
            points2: match.points2,
            date: match.date.toISOString().split("T")[0],
            matchDay: match.matchDay
        }
    )
}

export async function addComment(supabaseClient,comment: Comment): Promise<any>{
    return supabaseClient.from("comments").insert(
        {user_email: comment.user_email, text:comment.text, matchDay: comment.matchDay}
    )
}

export async function updateComment(supabaseClient,comment: Comment,  commentId: number): Promise<any>{
    return supabaseClient.from("comments").update(
        {user_email: comment.user_email, text:comment.text, matchDay: comment.matchDay}
    ).eq("id",commentId)
}


