console.log("this is library project");

//Constructor
function Book(name, author, type)
{ this.name = name;
  this.author = author;
  this.type = type;
}
//Display Constructor
function Display()
{    }

//Add methods to display prototype
Display.prototype.add = function(book){
    console.log("Adding to UI");
    tablebody = document.getElementById('tablebody');
    let uistring = `<tr>
                      <th>${book.name}</th>
                      <td>${book.author}</td>
                      <td>${book.type}</td>
                    </tr>`;
    tablebody.innerHTML += uistring;
}

//Implementing the clear function
Display.prototype.clear = function(){
  let libraryForm = document.getElementById('libraryForm');
  libraryForm.reset();
}

//Implementing the validate function
Display.prototype.validate = function(book){
    if(book.name.length<2 || book.author.length<2)
      { return false; }
    else 
      { return true; }
  }
Display.prototype.show = function(type,displaymessage){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
       <strong>Message:</strong> ${displaymessage}
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>` 
    setTimeout(function(){
        message.innerHTML = '' },2000);
}

//Add event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit)
 
function libraryFormSubmit(e){
    console.log("You have submitted the form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('Author').value;
    let type;
    let fiction = document.getElementById('fiction'); 
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if(fiction.checked)
      { type = fiction.value;  }
    else if(programming.checked)
      { type = programming.value;  }
    else if(cooking.checked)
      { type = cooking.value;   }

    let book = new Book(name, author, type);
    
    let display = new Display();

    if(display.validate(book))
      { display.add(book);
        display.clear();
        display.show('success','Your book has been successfully added.');
      }
    else{
        display.show('danger','Sorry you can not add this book');
    }
    e.preventDefault();
}