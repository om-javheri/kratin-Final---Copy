import React,{useEffect,useState} from 'react'
import Text_area from './Text_area'

export default function Alzheimer() {
  const [todoTasks, setTodoTasks] = useState([]);


  

  const handleAddTask = (task) => {
    // Add the new task to the state
    setTodoTasks([...todoTasks, task]);
  };


  return (
    <div>
<Text_area heading="Today" text1="Add"  text3="Delete" text4="Done" status="today" results={todoTasks.join('\n')} onAddTask={handleAddTask}/>

<Text_area heading="Next" text1="Add"  text3="Delete" text4="Today" status="next"/>
<Text_area heading="My Diary" text1="Add" text3="Delete" text4="Show" status="diary"/>




    </div>
  )
}
