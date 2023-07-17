var itemsarray=[];
var idnum=0;

fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then((data) => {
    // Process the received data
    data.forEach((item)=>{
        var todoobj={

            itemname:item.title,
    
            itemid:idnum+1
            
        };
    
        idnum=idnum+1;
    
        itemsarray.push(todoobj);
    }
    )
    renderlist();
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch request
    console.log('Error:', error.message);
  });
function savetext (){

    var todoitem=document.getElementById("itemtext").value;

    var todoobj={

        itemname:todoitem,

        itemid:idnum+1
        
    };

    idnum=idnum+1;

    

    itemsarray.push(todoobj);

    
    document.getElementById("itemtext").value="";

    renderlist();
    

}

function renderlist(){

    document.getElementById("tasklistid").innerHTML="";
    for( var i=0;i<itemsarray.length;i++){

        var eachtask= document.createElement("li");
        eachtask.classList.add("todo");

       
        var para= document.createElement("input");
        para.classList.add("inputtask");
        para.type='text';

        para.value=itemsarray[i].itemname;
        para.setAttribute('readonly', 'readonly');
        para.itemid=itemsarray[i].itemid

        eachtask.append(para);

        var icondiv=document.createElement("div");
        icondiv.classList.add("icons");

        

        var editicon=document.createElement("button");
        editicon.classList.add("editbtn");
        editicon.innerText = 'Edit';
        

      

       
       editicon.addEventListener('click', edittask);

        
      editicon.itemid=itemsarray[i].itemid;
       

       var deleteicon=document.createElement("button");
        deleteicon.classList.add("delbtn");
        deleteicon.innerText = 'Delete';
        
        
        deleteicon.itemid=itemsarray[i].itemid; 
        deleteicon.addEventListener('click',deletetask);

        icondiv.appendChild(editicon);
        icondiv.appendChild(deleteicon);
        eachtask.appendChild(icondiv);

        document.getElementById("tasklistid").append(eachtask);


    }
}

function deletetask(event) {


    var idx=itemsarray.findIndex(m=>m.itemid == event.target.itemid);
    itemsarray.splice(idx,1);
    renderlist();
}

function edittask(event){
    debugger;

   const item = event.target;
   var echtodo=item.parentElement.parentElement.firstChild;
     

   if (item.innerText.toLowerCase() == "edit") {
    item.innerText = "Save";
    echtodo.removeAttribute("readonly");
    echtodo.focus();
  } else {
    item.innerText = "Edit";
    echtodo.setAttribute("readonly", "readonly");
  }
        


}