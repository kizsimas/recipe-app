import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title >Recipe app</title>
        <meta name="description" content="cool recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline text-blue-500">
          Cool recipe app
        </h1>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </main>
    </div>
  )
}

export default Home

