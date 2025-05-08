import { useEffect, useRef, useState } from "react"

function Stopwatch(){
    const [isRunning,setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [wasStopped, setWasStopped] = useState(false);

    useEffect(()=>{
        let interval;
        if(isRunning){
           interval = setInterval(()=>{
                setTime((prevTime)=> prevTime+10);
            },10);
        }else if(!isRunning && time!==0){
            clearInterval(interval);
        }
        return()=>clearInterval(interval);
        }, [isRunning]);

    const formatTime=(ms)=>{

        const getHours = `0${Math.floor(ms / 3600000)}`.slice(-2);
        const getMinutes=`0${Math.floor((ms / 60000) % 60)}`.slice(-2);
        const getSeconds=`0${Math.floor((ms / 1000) % 60)}`.slice(-2);
        const getMilliseconds=`0${Math.floor(ms / 3600000)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <div>
          <h1>{formatTime(time)}</h1>
          <div>
          <button className="startButton" onClick={() => {
            if (wasStopped) {
                setTime(0);          // reset only if previously stopped
                setWasStopped(false);
            }
            setIsRunning(true);
            }}>Start</button>
            <button className="pauseButton" onClick={() => setIsRunning(false)}>Pause</button>
            <button className="stopButton" onClick={() => { 
                setIsRunning(false);
                setWasStopped(true);
                }}>Stop</button>
            <button className="resetButton" onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
          </div>
        </div>
      );
    };
export default Stopwatch