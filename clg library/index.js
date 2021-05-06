console.log('hey')
Showtable();

function Showtable(){
    let getBooks = localStorage.getItem('books');
    let Bookobj;
    if (getBooks == null) {
        Bookobj = [];
    } else {
        Bookobj = JSON.parse(getBooks);
    }

    let addRow = "";
    Bookobj.forEach(function (element, index) {
        addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (Bookobj.length == 0) {
        tableBody.innerHTML = "";
    }else{
        tableBody.innerHTML = addRow;
    }
}
function deleteBook(index){
    if(confirm('This Book will be deleted')){
    let getBooks = localStorage.getItem('books');
    let Bookobj;
    if (getBooks == null) {
        Bookobj = [];
    } else {
        Bookobj = JSON.parse(getBooks);
    }
    let namebook=Bookobj[index].name
    Bookobj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(Bookobj));
    message.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${namebook}</strong> has been deleted from the library.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  setTimeout(() => {
    message.innerHTML=``;
}, 4000);
    Showtable();

}
}

//book constructor
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

//display constructor
class Display{
    add(book){
        console.log('added')
        let Bookobj;

    let getbooks=localStorage.getItem('books');
    if(getbooks==null){
        Bookobj=[];
    }
    else{
        Bookobj=JSON.parse(getbooks);
    }
    Bookobj.push(book);
    localStorage.setItem('books', JSON.stringify(Bookobj));
    console.log(localStorage)
    Showtable();
    // tableBody = document.getElementById('tableBody');
    // let uistring = `
    // <tr>
    //     <td>${book.name}</td>
    //     <td>${book.author}</td>
    //     <td>${book.type}</td>
    // </tr>`;
    // tableBody.innerHTML += uistring;
    }
    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book){
        if(book.name.length<3 || book.author.length<3){
            return false;
        }
        else{
            return true;
        }
    }
    show(type, msg){
        let message = document.getElementById('message');
        message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Message!</strong> ${msg}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      setTimeout(() => {
          message.innerHTML=``;
      }, 4000);

}
}

//add methods to display constructor
// Display.prototype.add = function (book) {
//     console.log('added')
//     tableBody = document.getElementById('tableBody');
//     let uistring = `
//     <tr>
//         <td>${book.name}</td>
//         <td>${book.author}</td>
//         <td>${book.type}</td>
//     </tr>`;
//     tableBody.innerHTML += uistring;
// }
// Display.prototype.clear = function () {
//     let libraryForm = document.getElementById('libraryForm');
//     libraryForm.reset();
// }
// Display.prototype.validate = function (book) {
//     if(book.name.length<3 || book.author.length<3){
//         return false;
//     }
//     else{
//         return true;
//     }
// }
// Display.prototype.show = function (type, msg){
//     let message = document.getElementById('message');
//     message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//     <strong>Message!</strong> ${msg}.
//     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </div>`;
//   setTimeout(() => {
//       message.innerHTML=``;
//   }, 4000);
// }


//add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('submitted');
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success', 'your book has successfully been added');
    }
    else{
        display.show('danger', 'sorry you cannot add this book');
    }
    e.preventDefault();

}
