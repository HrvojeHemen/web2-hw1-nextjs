import {fetchAdmins} from "../db/db";

export async function isAdmin(admins: string[], userEmail: string): Promise<boolean> {

    if (admins === undefined || admins.length === 0 || userEmail === undefined) return false;
    for (let i = 0; i < admins.length; i++) {
        if (admins[i] === userEmail) {
            return true
        }
    }
    return false
}

export async function isAdminWithCall(supabaseClient, userEmail: string): Promise<boolean> {

    return fetchAdmins(supabaseClient).then(
        admins => {
            for (let i = 0; i < admins.length; i++) {
                if (admins[i].email === userEmail) return true
            }
            return false
        }
    )

}

