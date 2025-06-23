import { useState, useEffect, useRef } from "react";
import {ChevronUp, ChevronDown} from 'lucide-react';

function Timer(){
    const [timer, setTimer] = useState({hours:0,minutes:0,seconds:0});
    const [inputTime, setInputTime] = useState({hour:0,minute:0,second:0});
    const [isTimerStart, setIsTimerStart ] = useState(false);
    const interval = useRef(null);


    useEffect(()=>{
        if(isTimerStart){
        interval.current = setInterval(()=>{

            setTimer(prev=>{
                document.querySelector('.timer-circle').classList.add('glow-animation');
                if(prev['seconds'] > 0){
                    const sec = prev['seconds'] - 1 ;
                    return {...prev, seconds:sec}
                }
                else{
                    if(prev['minutes'] > 0){
                        const min = prev['minutes'] - 1;
                        const sec = 59
                        return {...prev, minutes:min, seconds:sec}
                    }
                    else if(prev['hours'] > 0){
                        const hrs = prev['hours'] - 1;
                        const min = 59;
                        const sec = 59;
                        
                        return {hours:hrs, minutes:min, seconds:sec}
                    }
                    else{
                        clearInterval(interval.current);
                        document.querySelector('.timer-circle').classList.remove('glow-animation');
                        return {hours:0, minutes:0, seconds:0}
                    }
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
        setTimer({
            hours:inputTime['hour'],
            minutes:inputTime['minute'],
            seconds:inputTime['second']
        });
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
        if(timer['hours']==0 && timer['minutes']==0 && timer['seconds']==0){
            return null;
        }
        setIsTimerStart(true);
        const buttons = document.querySelectorAll('#btn');
        buttons.forEach(button =>{
            button.disabled = true;
        })
        
    }

    function pauseTimer(){
        setIsTimerStart(false);
        document.querySelector('.timer-circle').classList.remove('glow-animation');
    }

    function resetTimer(){
        setIsTimerStart(false);
        const buttons = document.querySelectorAll('#btn');
        buttons.forEach(button =>{
            button.disabled = false;
        })
        setTimer({hours:0,minutes:0,seconds:0})
        setInputTime({hour:0,minute:0,second:0});
        document.querySelector('.timer-circle').classList.remove('glow-animation');
    }

    return(
        <div className="timer-container">
            <div className="timer-circle">
                <h1 className="timer">
                    <span id="hour">{timer['hours'].toString().padStart(2,'0')}</span>:
                    <span id="minute">{timer['minutes'].toString().padStart(2,'0')}</span>:
                    <span id="second">{timer['seconds'].toString().padStart(2,'0')}</span>
                </h1>
            </div>
            <div className="timer-handle-btn-container">
                <button className="timer-handle-btn" onClick={startTimer}>Start</button>
                <button className="timer-handle-btn" onClick={pauseTimer}>Pause</button>
                <button className="timer-handle-btn" onClick={resetTimer}>Reset</button>
            </div>

            <div className="time-settings-container">
                <div className="time-setting-slots">
                    {/* Hours input */}
                    <h2>{inputTime['hour'].toString()} hrs</h2>
                    <div className="time-setting-btn-container">
                        <button onClick={()=>timeIncrease('hourIncrease')} id="btn"><ChevronUp /></button>
                        <button onClick={()=>timeDecrease('hourDecrease')} id="btn"><ChevronDown /></button>
                    </div>
                </div>
                <div className="time-setting-slots">
                    {/* Minutes input */}
                    <h2>{inputTime['minute'].toString()} min</h2>
                    <div className="time-setting-btn-container">
                        <button onClick={()=>timeIncrease('minuteIncrease')} id="btn"><ChevronUp /></button>
                        <button onClick={()=>timeDecrease('minuteDecrease')} id="btn"><ChevronDown /></button>
                    </div>
                </div>
                <div className="time-setting-slots">
                    {/* Seconds input */}
                    <h2>{inputTime['second'].toString()} sec</h2>
                    <div className="time-setting-btn-container">
                        <button onClick={()=>timeIncrease('secondIncrease')} id="btn"><ChevronUp /></button>
                        <button onClick={()=>timeDecrease('secondDecrease')} id="btn"><ChevronDown /></button>
                    </div>
                </div>
            </div>

        </div>
    )
};



export default Timer;