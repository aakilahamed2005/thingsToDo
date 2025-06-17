import {useState} from 'react';


//TODO: save the ToDoList array in localStorage for that you should learn useEffect()
//* Everything works fine upto now
 
function ToDoList(){
    const [toDoList, setToDoList] = useState(Array());
    
    function addToDoListItem(){
        const toDoListInput = document.querySelector('#toDoListInput').value;
        if(toDoListInput == ''){
            return null;
        }

        //removing all the strings inside the input field
        document.querySelector('#toDoListInput').value = '';

        setToDoList([...toDoList, toDoListInput]);
    }

    function removeToDoListItem(itemIndex){
        //filter the items except the given indexed item and creates a new array
        const itemRemovedNewArray = toDoList.filter((_,i)=> itemIndex !== i);
        setToDoList(itemRemovedNewArray);

    }

    function changeToDoListItemUp(itemIndex){
        if(itemIndex !== 0){
            const newSwappedList = toDoList.slice();
            let temp = newSwappedList[itemIndex-1];
            newSwappedList[itemIndex-1] = newSwappedList[itemIndex];
            newSwappedList[itemIndex] = temp;
            setToDoList(newSwappedList);
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
        }
        else{
            return null;
        }

    }


    return(
        <div>
            <h1>Things To Do</h1>
            <input type="text" id="toDoListInput" placeholder="Enter things to do"/>
            <button onClick={addToDoListItem}>Add</button>


            <ul>
                {toDoList.map((item, itemIndex) => 
                <li key={itemIndex}>
                    {item}
                    <button onClick={()=>removeToDoListItem(itemIndex)}>X</button>
                    <button onClick={()=>changeToDoListItemUp(itemIndex)}>Up</button>
                    <button onClick={()=>changeToDoListItemDown(itemIndex)}>Down</button>
                </li>
                )}
            </ul>
        </div>
    )
}

export default ToDoList;