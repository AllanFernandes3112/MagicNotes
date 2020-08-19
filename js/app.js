//console.log("Script is working");
showNotes();



//on submit button click 
let addbtn = document.getElementById('addbtn');
let sta;

addbtn.addEventListener('click', function (e) {

     console.log(" btn event entered");

    let addtxt = document.getElementById('addtext');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);

    }

    let myObj = {
        title: addtitle.value,
        text: addtxt.value

    };
    if (myObj.title == "" && myObj.text == "") {
            alert("Kindly add some note in order for it to be added ");
    }

   else if (myObj.title == "" || myObj.text == "")  // if one of the inputs is missing
    {
        sta = confirm("One of the fields is missing are you sure you want to continue ?");

    }

    if (sta) {

        notesobj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesobj)); //localstorage cannot contain objects anad arrays thats why we r using json                                stringify anad parse  
        addtext.value = "";
        addtitle.value = "";
        showNotes();
    }



});


//function to shoe notes from the local storage
function showNotes() {


    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    }

    let html = "";
    let nothingHtml = `Nothing to show here add something using the "Add Note" button`;// when no cards are present 
    let htmlsearchresult = `Sorry we coouldn't find anything !!`
    notesobj.forEach(function (element, index) {
        html += `  
         <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
<div class="card-body">
    <h5 class="card-title" style="color:red"> ${element.title}</h5>
    <p class="card-text">${element.text}</p>
    <button id=${index} onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
</div>
</div>

`
    });

    let notesElem = document.getElementById('notes');
    if (notesobj.length != 0) {

        notesElem.innerHTML = html;




    }

    else {

        notesElem.innerHTML = nothingHtml;
    }




}


//function to delete note
function deleteNode(index) {
    //console.log("Deleteing", index);
    // console.log(index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {

        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();

}


//FOR SEARCHING MECHANISM 


let search = document.getElementById('searchtext');

search.addEventListener("input", function (e) {


    let inputval = search.value.toLowerCase();
    //  console.log(inputval);



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
