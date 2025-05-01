import { useState } from "react"


function TodoList(){

    const [tasks,setTasks] = useState(["Open Blinds","Make Bed","Stretch","Brush Teeth"]); //array
    const [newTask,setnewTask] = useState(""); //default value empty

    function handleInputChange(event){
        setnewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim()!==""){ //to prevent empty tasks
            setTasks(t=>[...t,newTask]);
        setnewTask("");
        }

    }
    
    function deleteTask(index){
        const updatedTasks=tasks.filter((_element,i)=>i!==index);
        setTasks(updatedTasks);

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

            <ol>
                {tasks.map((task,index)=>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="deleteButton"
                        onClick={()=>deleteTask(index)}>Delete</button>
                        <button className="moveButton"
                        onClick={()=>moveTaskUp(index)}>Move Up👆</button>
                        <button className="moveButton"
                        onClick={()=>moveTaskDown(index)}>Move Down👇</button>
                    </li>
                )}
            </ol>
        </div>
    )
}
export default TodoList