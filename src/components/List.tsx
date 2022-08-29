import { Trash } from "phosphor-react"
import styles from './List.module.css'
import Checked from '../assets/Checked.svg'
import Uncheked from '../assets/Uncheked.svg'

interface Item {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface List {
  item: Item;
  key: string;
  title: string;
  isCompleted: boolean;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string) => void;
}


export function List({ item, title, isCompleted, onDeleteTask, onUpdateTask, ...props }: List) {
  function handleDelete() {
    onDeleteTask(props.key)
  }

  function handleCheck() {
    onUpdateTask(props.key)
  }

  return (
    <div className={`${item.isCompleted === true ? styles.divListCompleted : styles.divList}`}>
      {isCompleted === true ? <img className={styles.img} onClick={handleCheck} src={Checked} alt="Concluir" /> : <img className={styles.img} onClick={handleCheck} src={Uncheked} alt="Desmarcar" /> }
      <div className={`${item.isCompleted === true ? styles.checked : ''}`}>
        <div>
         <span className={styles.title}>{title}</span>  
        </div>       
      </div>
      <Trash 
      className={styles.trash}
      onClick={handleDelete}
      size={19} />
    </div>
  )
}