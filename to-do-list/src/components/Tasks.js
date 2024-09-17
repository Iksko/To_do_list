import './Tasks.scss'
import Data from '../Data'
import { useState } from 'react'
import Bg_layout from '../images/bg_layout.png'
import {ReactComponent as MyStarIcon} from '../images/star.svg'
import {ReactComponent as MyXIcon} from '../images/xmark.svg'
import {ReactComponent as MyCheckIcon} from '../images/check.svg'


const Tasks = () => {

    
    const [task, setTask] = useState(Data)
    const [newTask, setNewTask] = useState('')
    
    const today = new Date().toISOString().split('T')[0]
    
    const deleteTaskHandler = (id) => {
        const resultTask = task.filter( (item) => {
            return item.id !== id
        })
        
        setTask(resultTask)
    }
    
    const deleteAll = () => {
        setTask([])
    }
    
    const newTaskHandler = () => {
        if (newTask.trim() === '' || !newTaskDate || !taskPriority) { alert('Please enter a title, select a date, and choose a priority.'); return; }
        
        const maxId = task.reduce((max, item) => (item.id > max ? item.id : max), 0)
        const newId = maxId+1


        const newTaskObject = {
            id: newId,
            name: newTask,
            date: newTaskDate,
            priority: taskPriority,
        }
                  
        setTask([...task, newTaskObject])
        setNewTask('')
        setNewTaskDate('')
        setTaskPriority('')
    }

    const priority = (priority) => {

        const golden = {
            fill: 'var(--gold)',
        }
        const silver = {
            fill: 'var(--silver)',
        }
        const bronz = {
            fill: 'var(--bronz)',
        }


        if(priority === 'high'){
            return <MyStarIcon style={golden} />
        }
        else if(priority === 'medium'){
            return <MyStarIcon style={silver} />
        }
        else if(priority === 'low'){
            return <MyStarIcon style={bronz} />
        }
        else{
            return 
        }
    }

    const [newTaskDate, setNewTaskDate] = useState('');

    const active = (date) => {

        const today = new Date()
        const taskDate = new Date(date)

        const green = {
            color: 'var(--green)',
        }
        const red = {
            color: 'var(--red)'
        }

        if(taskDate > today){
            return <p style={green}>Active</p>
        }
        else{
            return <p style={red}>Overdue</p>
        }
    }

    const [taskPriority, setTaskPriority] = useState('')

    const priorityHandler = (event) => {
        setTaskPriority(event.target.value)

    }


    

    return(
        <>
            <img id='bg_layout' src={Bg_layout} alt="bg_layout" />
            <div className="wrapper">
                <h2>Your tasks</h2>
                <div className="tasksContainer">

                    <div className='tasks'>
                        {
                            task.map( (item, id) => {
                                return (
                                    <div key={id} className='oneTask'>
                                        <div className='content'>
                                            <div className='title'>
                                                <h2>{item.name}</h2>
                                                {priority(item.priority)}
                                            </div>
                                            <p>{item.date}</p>
                                            <div className='active'>
                                                {active(item.date)}
                                            </div>
                                        </div>
                                        <div className='btns'>
                                            <button onClick={() => deleteTaskHandler(item.id)}>Done<MyCheckIcon /></button>
                                            <button onClick={() => deleteTaskHandler(item.id)}><MyXIcon /></button>
                                        </div>
                                    </div>

                                )

                            })
                        }
                    </div>
                    <div id='deleteAll'>
                        <button onClick={deleteAll}>Delete all<MyXIcon/></button>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <h2>New task</h2>
                <div className='inputs'>
                    <label htmlFor="title">Task title</label>
                    <input name='title' type="text" value={newTask} onChange={(element) => setNewTask(element.target.value)} placeholder='Zadej nový úkol' required/>
                </div>
                <div className='inputs'>
                    <label htmlFor="date">Deadline</label>
                    <input name='date' type="date" min={today} onChange={(element) => setNewTaskDate(element.target.value)} required/>
                </div>
                <div className="inputs">
                    <label>Priority</label>
                    <div className='priorities'>
                        <label>
                                <input name='priority' value='high' checked={taskPriority==='high'} onChange={priorityHandler} type="radio" />
                                <MyStarIcon className={taskPriority === 'high' ? 'icon-active-high' : 'icon'}/>
                                <span className={taskPriority === 'high' ? 'icon-active-high' : 'icon'}>High</span>
                        </label>
                        <label>
                                <input name='priority' value='medium' checked={taskPriority==='medium'} onChange={priorityHandler} type="radio" />
                                <MyStarIcon className={taskPriority === 'medium' ? 'icon-active-med' : 'icon'}/>
                                <span className={taskPriority === 'medium' ? 'icon-active-med' : 'icon'}>Medium</span>
                        </label>
                        <label>
                            <input name='priority' value='low' checked={taskPriority==='low'} onChange={priorityHandler} type="radio"  />
                                <MyStarIcon className={taskPriority === 'low' ? 'icon-active-low' : 'icon'} />
                                <span className={taskPriority === 'low' ? 'icon-active-low' : 'icon'}>Low</span>
                        </label>
                    </div>
                </div>
                <button type='submit' onClick={newTaskHandler}>Add task</button>
            </div>
        </>
    )
}
export default Tasks