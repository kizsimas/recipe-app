import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { makeImageUrl } from '../lib/imageUrls'

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
          <img className={styles.suo} src={makeImageUrl('images/suo11.PNG')} alt="" />
          <img className={styles.suo} src={makeImageUrl('images/suo12.PNG')} alt="" />
          <img className={styles.suo} src={makeImageUrl('images/suo13.PNG')} alt="" />
          <img className={styles.suo} src={makeImageUrl('images/suo14.PNG')} alt="" />
          <img className={styles.suo} src={makeImageUrl('images/suo15.PNG')} alt="" />
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

