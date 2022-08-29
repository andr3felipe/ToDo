import styles from './Task.module.css'
import Clipboard from '../assets/Clipboard.svg'
import { useState, useEffect } from 'react'
import { Input } from './Input';
import { List } from './List';


interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function Task() {
  
  const [task, setTask] = useState<Task[]>([])

  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    if (task.length > 0){
      localStorage.setItem('task', JSON.stringify(task))
    }
    if (task.length === 0){
      const getLocalStorage = localStorage.getItem('task')
      if (getLocalStorage !== null){
        setTask(JSON.parse(getLocalStorage))
      }
    }
  }, [task])

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = task.filter(element => {
      return element.id !== taskToDelete
    })
    setTask(tasksWithoutDeletedOne)

    const get: any = localStorage.getItem('task')
    const parsed = JSON.parse(get)
      if(parsed.length === 1){
        localStorage.removeItem('task')
      }
  }

  function updateTask(taskToUpdate: string){
    const getObject = task.filter(element => element.id === taskToUpdate)

    if (getObject[0]?.isCompleted === true){
            setTask(current => 
        current.map(obj => {
          if(obj.id === taskToUpdate){
            return {...obj, isCompleted: false}
          }
          return obj
        })
        )
    } else {
      setTask(current => 
        current.map(obj => {
          if(obj.id === taskToUpdate){
            return {...obj, isCompleted: true}
          }
          return obj
        })
        )
    }

  }

    const countCompleted = task.filter(item => item.isCompleted === true)

  return (
    <div>
        <Input 
        task={task}
        setTask={setTask}
        newTask={newTask}
        setNewTask={setNewTask}
        />

  <div className={styles.taskWrapper}>
    <div className={styles.divAlign}>
     <div className={styles.divTask}>
       <div>
         Tarefas criadas<span>{task?.length}</span>
        </div>
        <div>
          Concluidas
          <span>{task.length > 0 ?
           `${countCompleted.length} de ${task.length}`
           : task.length}</span>
        </div>
      </div>

        {task?.length === 0 
        ? <div className={styles.tasks}>
        <img src={Clipboard} alt="clipboard" />
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        : 
        <div className={styles.TESTE}>
          {task?.map(item => 
          <List 
            key={item.id}
            title={item.title}
            isCompleted={item.isCompleted}
            item={item}
            onDeleteTask={() => deleteTask(item.id)}
            onUpdateTask={() => updateTask(item.id)}
          />)}
        </div>
    }
    </div>
  </div>
    </div>
  )
}