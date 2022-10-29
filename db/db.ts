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