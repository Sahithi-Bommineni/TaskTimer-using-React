import { useEffect, useState } from "react"
import axios from 'axios';
import Stopwatch from "./Stopwatch";


function TodoList(){

    const [tasks,setTasks] = useState([]);
    //     { id: 1, title: "Open Blinds", timeSpent: 0, completed: false },
    // { id: 2, title: "Make Bed", timeSpent: 0, completed: false },
    // { id: 3, title: "Stretch", timeSpent: 0, completed: false },
    // { id: 4, title: "Brush Teeth", timeSpent: 0, completed: false }
    // ]); //array
    const [newTask,setnewTask] = useState(""); //default value empty
    useEffect(()=>{
        axios.get('http://localhost:3000/gettask').then
        (res => {
            setTasks(res.data); // Assuming backend sends an array of tasks
        })
        .catch(err => console.error("Error fetching tasks:", err));
    }, []);

    function handleInputChange(event){
        setnewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim()!==""){ //to prevent empty tasks
            const newTaskObj = {
                id: Date.now(),         // temporary unique ID
                task: newTask.trim(),  // task title
                timeSpent: 0,           // initial time
                completed: false,       // not completed yet
              };
          
            //   setTasks(t=> [...t, newTaskObj]);
            //   setNewTask(""); // clear input
            axios.post('http://localhost:3000/addtask', newTaskObj).then
            (res => {
                setTasks(prev => [...prev, res.data]); // assuming backend returns the saved task with ID
                setNewTask(""); // clear input
                })
            .catch(err => console.error("Error adding task:", err));
            }
        }
    
    const deleteTask = (id) =>{
        axios.delete(`http://localhost:3000/delete/${id}`).then(
            arr=>setTasks(arr.data)
        )
    }

    function moveTaskUp(index){
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=[updatedTasks[index-1],updatedTasks[index]]; //swapping elements inside an array
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=[updatedTasks[index+1],updatedTasks[index]]; //swapping elements inside an array
            setTasks(updatedTasks);
        }
    }

    return(
        <div>
            <h1>To Do List</h1>
            <div className="to-do-list">
                <input type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleInputChange}></input>
                <button className="add-button"
                onClick={addTask}>Add</button>
            </div>

            <ul className="tasklist">
                <div className="container">
                {tasks.map((task,index)=>
                    <li key={task.id}>
                        <span className="text">{task.task}</span>
                        <button className="deleteButton"
                        onClick={()=>deleteTask(task.id)}>Delete</button>
                        <button className="moveButton"
                        onClick={()=>moveTaskUp(task.id)}>👆</button>
                        <button className="moveButton"
                        onClick={()=>moveTaskDown(task.id)}>👇</button>
                        <Stopwatch/>
                    </li>
                )}
                </div>
            </ul>
            
        </div>
    );
}
export default TodoList