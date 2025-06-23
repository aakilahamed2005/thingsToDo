import {useState, useEffect} from 'react';
import {CircleChevronUp, CircleChevronDown, SquareX} from 'lucide-react';

 
function ToDoList(){
    const [toDoList, setToDoList] = useState([]);
    const [updateLocalStorage, setUpdateLocalStorage] = useState(false);

    useEffect(()=>{
        const getlocalStorage = localStorage.getItem('toDoListStorage');
        if(getlocalStorage != null){
            setToDoList(JSON.parse(getlocalStorage));
        }
        else{
            localStorage.setItem('toDoListStorage',JSON.stringify([]));
        }
    },[]);

    useEffect(()=>{
        if(updateLocalStorage){
        localStorage.setItem('toDoListStorage',JSON.stringify(toDoList));
        }
    },[updateLocalStorage, toDoList]);

    
    function addToDoListItem(){
        const toDoListInput = document.querySelector('#toDoListInput').value;
        if(toDoListInput == ''){
            return null;
        }

        //removing all the strings inside the input field
        document.querySelector('#toDoListInput').value = '';

        setToDoList([...toDoList, toDoListInput]);
        setUpdateLocalStorage(true);
    }

    function removeToDoListItem(itemIndex){
        //filter the items except the given indexed item and creates a new array
        const itemRemovedNewArray = toDoList.filter((_,i)=> itemIndex !== i);
        setToDoList(itemRemovedNewArray);
        setUpdateLocalStorage(true);

    }

    function changeToDoListItemUp(itemIndex){
        if(itemIndex !== 0){
            const newSwappedList = toDoList.slice();
            let temp = newSwappedList[itemIndex-1];
            newSwappedList[itemIndex-1] = newSwappedList[itemIndex];
            newSwappedList[itemIndex] = temp;
            setToDoList(newSwappedList);
            setUpdateLocalStorage(true);
        }
        else{
            return null;
        }

    }

    function changeToDoListItemDown(itemIndex){
        if(itemIndex !== toDoList.length-1){
            const newSwappedList = toDoList.slice();
            let temp = newSwappedList[itemIndex+1];
            newSwappedList[itemIndex+1] = newSwappedList[itemIndex];
            newSwappedList[itemIndex] = temp;
            setToDoList(newSwappedList);
            setUpdateLocalStorage(true);
        }
        else{
            return null;
        }

    }


    return(
        <div className='todolist-container'>
            <h1>Things To Do</h1>
            <input type="text" id="toDoListInput" placeholder="Enter things to do"/>
            <button onClick={addToDoListItem}>Add</button>

            <div className='items-container'>
                <ul>
                    {toDoList.map((item, itemIndex) =>
                    <li className="item-box" key={itemIndex}>
                        <div className='item'><p>{item}</p></div>
                        <div className='item-handle-btn'>
                            <div onClick={()=>changeToDoListItemDown(itemIndex)}><CircleChevronDown /></div>
                            <div onClick={()=>changeToDoListItemUp(itemIndex)}><CircleChevronUp /></div>
                            <div onClick={()=>removeToDoListItem(itemIndex)}><SquareX /></div>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
            
        </div>
    )
}

export default ToDoList;