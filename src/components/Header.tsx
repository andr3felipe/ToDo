import styles from './Header.module.css'
import ToDoLogo from '../assets/ToDo-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={ToDoLogo} alt="ToDo Logo" />
    </header>
  )
}