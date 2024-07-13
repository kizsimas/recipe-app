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
        <div className={styles.dogs}>
          <img className={styles.suo} src="http://192.168.1.8/images/so.png" alt="" />
          <img className={styles.suo} src="http://192.168.1.8/images/suo11.PNG" alt="" />
          <img className={styles.suo} src="http://192.168.1.8/images/suo12.PNG" alt="" />
          <img className={styles.suo} src="http://192.168.1.8/images/suo13.PNG" alt="" />
          <img className={styles.suo} src="http://192.168.1.8/images/suo14.PNG" alt="" />
          <img className={styles.suo} src="http://192.168.1.8/images/suo15.PNG" alt="" />
        </div>
        <h1 className="text-3xl font-bold underline text-blue-500">
          Cool recipe app
        </h1>
        <Link href="/recipes">
          Recipes
        </Link>
      </main>
    </div>
  )
}

export default Home

