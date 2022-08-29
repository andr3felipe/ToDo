import { PlusCircle } from 'phosphor-react'
import styles from './Input.module.css'
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, InvalidEvent } from 'react'

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Input {
  task: Task[];
  newTask: string;
  setTask: (value: Task[]) => void;
  setNewTask: (value: string) => void;
}


export function Input({ task, setTask, newTask, setNewTask }: Input) {

  function handleOnChangeTask(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleCreateNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault()

    if (newTask.length > 0 && newTask.length <= 1000){
      const newTaskObject = {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
      }
      setTask([...task, newTaskObject])
      setNewTask('')

    }else if (newTask.length > 1000){
      alert('Too many characteres.')

    }
  }

  return (
    <div>
      <div className={styles.alignInput}>
      <form className={styles.divInput} 
      onSubmit={handleCreateNewTask}>

      <input 
      value={newTask}
      onChange={handleOnChangeTask}
      type="text" 
      placeholder="Adicione uma nova tarefa"
      required
      onInvalid={handleCreateNewTaskInvalid}
      />

      <button
      type="submit"
      disabled={newTask.length === 0}
      >Criar<PlusCircle size={20} weight='bold' />
      </button>
      </form>
      </div>

        <div className={styles.characteres}>
            <div>
             <span className={`${(newTask.length > 0) ? 
              (newTask.length >= 1001 ? styles.spanMinus : styles.span) : styles.spanHidden }`}>
              {1000 - newTask?.length}</span> 
             </div>         
        </div>
      </div>
  )
}