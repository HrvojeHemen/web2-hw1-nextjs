import styles from '../styles/Home.module.css'
import {useUser} from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Home() {
    const {user} = useUser();
    return (
        <div className={styles.container}>
            <Link href="/api/auth/login">Login</Link>
            <Link href="/api/auth/logout">Logout</Link>
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    )
}
