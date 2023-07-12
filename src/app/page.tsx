import Image from 'next/image'
import styles from './page.module.css'
import {Header} from "@components/app/header/layout";
import {Test} from "@components/app/test/layout";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Test />
    </main>
  )
}
