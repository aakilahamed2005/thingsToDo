import { useState, useEffect, useRef } from "react";

function Test(){
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [inputTime, setInputTime] = useState({hour:0,minute:1});
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
        else{
            clearInterval(interval.current);
        }
        
        return ()=>{
            clearInterval(interval.current);
        }
    },[isTimerStart]);


    // TODO: To some comments in this function to avoid confushion in future
    function timeIncrease(whatToIncrease){
        
        if(whatToIncrease == 'minuteIncrease'){
            if(inputTime['minute'] < 59){
                const min = inputTime.minute + 1;
                setInputTime(prev=>({...prev, minute:min}));
            }
        }
        
        else if(whatToIncrease == 'hourIncrease'){
            if(inputTime['hour'] < 24){
                const hour = inputTime['hour'] + 1;
                setInputTime(prev=>({...prev, hour:hour}));
            }
        }
        
        
    }

    function timeDecrease(whatToDecrease){
        
        if(whatToDecrease == 'minuteDecrease'){
            if(inputTime['minute'] > 1){
                const min = inputTime.minute - 1
                setInputTime(prev=>({...prev, minute:min}))
            }
        }
        
        else if(whatToDecrease == 'hourDecrease'){
            if(inputTime['hour'] > 0){
                const hour = inputTime['hour'] - 1
                setInputTime(prev=>({...prev, hour:hour}))
            }
        }
    }

    
    function startTime(){
        setIsTimerStart(true);
    }

    function pauseTime(){
        setIsTimerStart(false);
    }

    function resetTime(){
        setIsTimerStart(false);
        setSeconds(15);
    }

    return(
        <>
        <h1>
            <span id="hour">{hours.toString().padStart(2,'0')}</span>:
            <span id="minute">{minutes.toString().padStart(2,'0')}</span>:
            <span id="second">{seconds.toString().padStart(2,'0')}</span>
        </h1>
        <button onClick={startTime}>Start</button>
        <button onClick={pauseTime}>Pause</button>
        <button onClick={resetTime}>Reset</button>
        

        <div>
            {/* Hour input */}
            <h2>{inputTime['hour'].toString()} hour</h2>
            <button onClick={()=>timeIncrease('hourIncrease')}>Up</button>
            <button onClick={()=>timeDecrease('hourDecrease')}>Down</button>
        </div>
        <div>
            {/* Minute input */}
            <h2>{inputTime['minute'].toString()} min</h2>
            <button onClick={()=>timeIncrease('minuteIncrease')}>Up</button>
            <button onClick={()=>timeDecrease('minuteDecrease')}>Down</button>
        </div>
        </>
    )
}



export default Test;