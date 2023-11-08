// function to retrive the form the localstorage
document.addEventListener('DOMContentLoaded',()=>{
    DataPresent=localStorage.getItem('tasksname')
    console.log(DataPresent)
    if(DataPresent!==null){
        TaskList=JSON.parse(DataPresent)
        DynamicRendering()
    }
})


//array to store the todos
let TaskList=[]
// function to savethe task
function Savetask(){
    // debugger;
    //access the html elements into javscript
const Taskname=document.getElementById('val').value
// trim method to remove the spaces from the input
   if(Taskname.trim()!==''){
let taskdata={
    // length proprty to increase the id value each-time the user enters a new value
        Id:TaskList.length+1,
        taskname:Taskname // input value entered by user
    }
    // pushing the object data into array
    TaskList.push(taskdata)
}
//used to empty the input value once the task is added
document.getElementById('val').value=''
// to add array items into localstorage
localStorage.setItem('tasksname',JSON.stringify(TaskList))
//calling the dynamicrendering function
DynamicRendering()
}


// function for dynamic rendering of list
function DynamicRendering(){
    // debugger;
    document.getElementById('Tasks').innerHTML=''
    for(i=0; i<TaskList.length;i++){
        //creating the li element
    let DynamicLi=document.createElement('li')
    //adding the class attribute value to li
    DynamicLi.classList.add('task')
    // creating the paragraphelement
    let ParaEle=document.createElement('p')
    // adds text values in the dynamic list
    ParaEle.innerHTML=TaskList[i].taskname
    //appending paragraph element into list (li) element
    DynamicLi.appendChild(ParaEle)
    //appending the li to ul list
    document.getElementById('Tasks').appendChild(DynamicLi)
    //creating the div element  to add edit and delete icons
    const Divele=document.createElement('div')
    // adding the class attribute value for styling purpose
    Divele.classList.add('crud')

    // creating the editicon and adding the class it
    const EditIcon=document.createElement("i")
    EditIcon.classList.add("bi")
    EditIcon.classList.add("bi-pencil-square")
    //adding the functionality to editicon
    EditIcon.addEventListener('click',EditTask)
    // getting the specific id through the EditIcon
    EditIcon.Id=TaskList[i].Id
    
     // creating the deleteicon and adding the class it
     const DeleteIcon=document.createElement("i")
     DeleteIcon.classList.add("bi")
     DeleteIcon.classList.add("bi-trash")
      //adding the functionality to editicon
    DeleteIcon.addEventListener('click',DeleteTask)
    DeleteIcon.Id=TaskList[i].Id

    //  appending both edit and delete icons to the div ele
    Divele.appendChild(EditIcon)
    Divele.appendChild(DeleteIcon)
    // appending divelement to dynamiclist
    DynamicLi.appendChild(Divele)



    }
}


// function for editing the task
function EditTask(e){
    console.log(e.target)
    // targeting the specific id through find index method
    var Ed=TaskList.find((d)=>d.Id == e.target. Id)
    console.log(Ed)
    document.getElementById('val').value=Ed.taskname

}
// function for deleting the task
function DeleteTask(e){
    console.log(e.target)
    var index=TaskList.findIndex((d)=>d.Id == e.target. Id)
    console.log(index)
    TaskList.splice(index,1)
    // update the deleted tasks in local storage
    localStorage.setItem('tasksname',JSON.stringify(TaskList))
    DynamicRendering()
}
//function to remove all the task
function RemoveTask(){
    TaskList.splice(0)
    // to remove all the items in the localstorage
    localStorage.removeItem('tasksname')
  DynamicRendering()
}