import Image from 'next/image'
import styles from './page.module.css'
import Game from './tictactoe/game/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Game />
      </div>
    </main>
  )
}
