import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useUser} from "@auth0/nextjs-auth0";

export default function Home() {
    const {user} = useUser();
    return (
        <div className={styles.container}>
            <a href="/api/auth/login">Login</a>
            <a href="/api/auth/logout">Logout</a>
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    )
}
