
console.log("Script is working");
let backgroundStatus; // change the background color 

showNotes();



//on submit button click 
let addbtn = document.getElementById('addbtn');
let sta;
let statusFlag; //1-->both fields are present 
                //1--> one of the fields is not present but user has allowed to enter the data in local storage     
                //2-->one of the fields is not present and user  not  allowed to enter the data in local strorage 
                //2-->both fields are absent   

addbtn.addEventListener('click', function (e) {

    //console.log(" btn event entered");

    let addtxt = document.getElementById('addtext').value;
    let addtitle = document.getElementById('addtitle').value;
    //  console.log(addtitle,addtxt); 


    let notes = localStorage.getItem('notes');
    console.log("  NOtes is " + notes);

    if (notes == "[]") {
        notes = null;

    }


    if (notes == null) {
        notesobj = [];
    }
    else {
        // **Data stored in local Storage is in String format **
        notesobj = JSON.parse(notes);

    }


    let myObj = {


        title: addtitle,
        text: addtxt,
        style: ""


    };

    
    
    // console.log("Staus flag is "+statusFlag);


    if (myObj.title == "" && myObj.text == "") { //if both inputs are missing
        alert("Kindly add some note in order for it to be added ");
        statusFlag = 2;
    }

    else if (myObj.title == "" || myObj.text == "")  // if one of the inputs is missing
    {
        sta = confirm("One of the fields is missing are you sure you want to continue ?");
        if (sta == true) {
            statusFlag = 1
        }
        else {
            statusFlag = 2;
        }




    }

    else if (myObj.title.length >= 1 && myObj.text.length >= 1) {  // if both inputs arre present 
        
        statusFlag = 1;
    }

    if (statusFlag == 1) {


        notesobj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesobj)); //localstorage cannot contain objects anad arrays thats why we r using json stringify to convert our object(notesObj) to string 

        // to reset the input fields after clicking on the add button
        document.getElementById('addtext').value = "";
        document.getElementById('addtitle').value = "";

        showNotes();
    }



});


//function to show notes from the local storage
//WORKING====
// to display the notes from the local storage into the frontend 
function showNotes() {


    let notes = localStorage.getItem('notes');
    // console.log(notes);
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    let nothingHtml = `Nothing to show here add something using the "Add Note" button`; // when no cards are present 
    notesobj.forEach(function (element, index) {


        html += `   <div class=" noteCard my-2 mx-2 card change" id="noteCard${index}" style="width: 18rem; border:2px solid rgb(77, 73, 73) ;  border-radius: 10px ; ">
                    <div class="card-body">
                        <h5 class="card-title"  style="color:rgb(221, 137, 137)"> ${element.title} </h5>
                        <p class="card-text" id ="cardtext${index}" >${element.text} </p>
                        <button id=${index} onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
                    <button id="imp${index}" onclick="markImportant(${index})" class="btn btn-primary my-2">Mark Important</button>
                    <button id=${index} onclick="unmarkImportant(this.id)" class="btn btn-primary">Mark Not Important </button>


                    
                    </div>
                    </div>`;

    });



    let notesElem = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {

        notesElem.innerHTML = nothingHtml;
    }

    // function call inorder to change the background color of cards depending on whether the cards are marked as important or not 
    changeBackground(notesobj);


}


//function to delete note
// WORKING=====
// when clicked on this button the associated note will get deleted 
function deleteNode(index) {
 
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);  // method to delete from OBJECT

    // Resetting notes of Local Storage after deletion from notesobj OBJECT 
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();

}


//FOR SEARCHING MECHANISM 
// WORKING====
// SEARCH the input entered in Search TEXTBOX within the notes that were created 
let search = document.getElementById('searchtext');
search.addEventListener("input", function (e) {

    let inputval = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('noteCard');
    //  console.log("Inpuet fired");
    Array.from(notecard).forEach(function (element) {

        let cardtxt = element.getElementsByTagName('p')[0].innerText;

        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {

            element.style.display = "none";
        



        }

    })


});



//MARK IMPORTANT Function 
// WORKING =====
// on clicking this button the background color if this div will change to " antiquewhite  "  color 


function markImportant(id) {

    let text = document.getElementById(`cardtext${id}`);
  
    let notes = localStorage.getItem('notes');
    //  console.log("Notes is "+notes);
  
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    }

    //code for updating the style of partickar card in local storage 
    notesobj[id].style = "Colorwillchange";
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();


}


function unmarkImportant(id) {


    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    }

    //code for updating the style of partickar card in loal storage 
    notesobj[id].style = "";
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();



}


// FUNCTION TO CHANGE THE BACKGROUND OF DIV 
function changeBackground() {

    // console.log("CHange background  function called  ");

    notesobj.forEach(function (element, index) {
        let bgcolor = document.getElementById(`noteCard${index}`);
        if (notesobj[index].style == "") {
            //will execute whenever a note is created or the "not Important BUTTON " is clicked 
            
            bgcolor.style.color = "#FFFFFF";
            bgcolor.style.backgroundColor = "343A40";
            bgcolor.style.width = "18rem";
            bgcolor.style.marginLeft = "2px";
            bgcolor.style.marginTop = "4px";

        }

        else {
            //will execute whenever the "Mark Important BUTTON" is clicked 

            bgcolor.style.backgroundColor = "antiquewhite"
            bgcolor.style.color = "black";
            bgcolor.style.width = "18rem";
            bgcolor.style.marginLeft = "4px";
            bgcolor.style.marginTop = "4px";

        }

    });





}







