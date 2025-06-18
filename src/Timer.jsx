import { useState, useEffect, useRef } from "react";

function Timer(){
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [inputTime, setInputTime] = useState({hour:0,minute:0,second:0});
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


    useEffect(()=>{
        setSeconds(s=> s =inputTime.second);
        setMinutes(m=> m =inputTime.minute);
        setHours(h=> h =inputTime.hour);
    },[inputTime]);


    function timeIncrease(whatToIncrease){
        /* This function is called when the user clicks on the decrease button */
        /* 
        To find out what button is clicked (hour or minute) it passes a parameter with a 
        string that says 'minuteIncrease' or 'hourIncrease' so using that developer can findout
        whether its passed from minute increase or hour decrease button
        */
        
        if(whatToIncrease == 'minuteIncrease'){
            /* 
            This condition stricts the minute value to be under 59.
            inside a hour there is 60 minutes
            */
            if(inputTime['minute'] < 59){
                const min = inputTime.minute + 1;
                setInputTime(prev=>({...prev, minute:min}));
            }
            else{
                const min = 0;
                setInputTime(prev=>({...prev, minute:min}));
            }
            
        }
        
        else if(whatToIncrease == 'hourIncrease'){
            /* 
            This condition stricts the hour value to be under 24.
            */
            if(inputTime['hour'] < 24){
                const hour = inputTime['hour'] + 1;
                setInputTime(prev=>({...prev, hour:hour}));
            }
            else{
                const hour = 0;
                setInputTime(prev=>({...prev, hour:hour}));
            }
        }

        else if(whatToIncrease == 'secondIncrease'){
            /* 
            This condition stricts the second value to be under 59.
            */
            if(inputTime['second'] < 59){
                const sec = inputTime['second'] + 1;
                setInputTime(prev=>({...prev, second:sec}));
            }
            else{
                const sec = 0;
                setInputTime(prev=>({...prev, second:sec}));
            }
        }
        
        
    }

    function timeDecrease(whatToDecrease){
        /* This function is called when the user clicks on the decrease button */
        /* 
        To find out what button is clicked (hour or minute) it passes a parameter with a 
        string that says 'minuteDecrease' or 'hourDecrease' so using that developer can findout
        whether its passed from minute decrease or hour decrease button
        */

        if(whatToDecrease == 'minuteDecrease'){
            /* This condition stricts the minute value to be postive integers only */
            if(inputTime['minute'] > 0){

                /* reduce the value from 1 and set it to the inputTime state hook */
                const min = inputTime.minute - 1;
                setInputTime(prev=>({...prev, minute:min}));
            }
            else{
                const min = 59;
                setInputTime(prev=>({...prev, minute:min}));
            }
        }
        
        else if(whatToDecrease == 'hourDecrease'){
            /* This condition stricts the hour value to be postive integers only */
            if(inputTime['hour'] > 0){

                /* reduce the value from 1 and set it to the inputTime state hook */
                const hour = inputTime['hour'] - 1;
                setInputTime(prev=>({...prev, hour:hour}));
            }

            else{
                const hour = 24;
                setInputTime(prev=>({...prev, hour:hour}));
            }
        }


        else if(whatToDecrease == 'secondDecrease'){
            /* This condition stricts the second value to be between 0-59 */
            if(inputTime['second'] > 0){

                /* reduce the value from 1 and set it to the inputTime state hook */
                const sec = inputTime['second'] - 1;
                setInputTime(prev=>({...prev, second:sec}));
            }

            else{
                const sec = 59;
                setInputTime(prev=>({...prev, second:sec}));
            }

        }
    }

    
    function startTimer(){
        setIsTimerStart(true);
    }

    function pauseTimer(){
        setIsTimerStart(false);
    }

    function resetTimer(){
        setIsTimerStart(false);
    }

    return(
        <>
        <h1>
            <span id="hour">{hours.toString().padStart(2,'0')}</span>:
            <span id="minute">{minutes.toString().padStart(2,'0')}</span>:
            <span id="second">{seconds.toString().padStart(2,'0')}</span>
        </h1>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
        

        <div>
            {/* Hours input */}
            <h2>{inputTime['hour'].toString()} hrs</h2>
            <button onClick={()=>timeIncrease('hourIncrease')}>Up</button>
            <button onClick={()=>timeDecrease('hourDecrease')}>Down</button>
        </div>
        <div>
            {/* Minutes input */}
            <h2>{inputTime['minute'].toString()} min</h2>
            <button onClick={()=>timeIncrease('minuteIncrease')}>Up</button>
            <button onClick={()=>timeDecrease('minuteDecrease')}>Down</button>
        </div>
        <div>
            {/* Seconds input */}
            <h2>{inputTime['second'].toString()} sec</h2>
            <button onClick={()=>timeIncrease('secondIncrease')}>Up</button>
            <button onClick={()=>timeDecrease('secondDecrease')}>Down</button>
        </div>
        </>
    )
}



export default Timer;