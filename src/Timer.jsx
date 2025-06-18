import { useState, useEffect, useRef } from "react";

function Test(){
    const [seconds, setSeconds] = useState(15);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [time, setTime] = useState(1);
    const [isTimerStart, setIsTimerStart ] = useState(false);
    const interval = useRef(null);


    useEffect(()=>{
        if(isTimerStart){
        interval.current = setInterval(()=>{
            setSeconds(prev =>{
                if(prev > 0){
                    return prev - 1
                }
                else{
                    clearInterval(interval.current);
                        return 0;
                }
            });
        },1000);
        }
        
        return ()=>{
            clearInterval(interval.current);
        }
    },[isTimerStart]);

    function timeIncrease(){
        setTime(time + 1);
    }

    function timeDecrease(){
        if(time !=1 ){
            setTime(time - 1);
        }
    }

    function startTime(){
        setIsTimerStart(true);
    }


    return(
        <>
        <h1>{seconds.toString().padStart(2,'0')}</h1>
        <button onClick={startTime}>Start</button>
        <button>Pause</button>
        <button>Reset</button>
        
        <div>
            <h2>{time.toString()} min</h2>
            <button onClick={timeIncrease}>Up</button>
            <button onClick={timeDecrease}>Down</button>
        </div>
        </>
    )
}



export default Test;