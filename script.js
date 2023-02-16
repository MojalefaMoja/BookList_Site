// Book Class:Represents Book.
class Book{
  constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}




// UI Class: handles UI tasks
class UI{
  static displaybooks(){
    const books = Store.getbooks();


    books.forEach((book) => UI.addbookToList(book));

  }
  static addbookToList(book){
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = ` 
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a herf ="#" class="btn btn-danger btn-sm delete">X</a></td>`
    ;

    list.appendChild(row);
  }
  
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

static showAlert(message, className){

  const div=document.createElement('div');

  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);



  //vanish in 3 seconds
  setTimeout(() => document.querySelector('.alert').remove(),3000);

}

  static clearFields(){
document.querySelector('#title').value=' ';
document.querySelector('#author').value=' ';
document.querySelector('#isbn').value=' ';

  }
}



// Store Class: handles storage
class Store{
 static  getbooks(){
   let books;
   if (localStorage.getItem('books') === null){
     books = [];
        } else {
          books =JSON.parse(localStorage.getItem('books'));
        }
   return books;
  }

  static addbook(book){

    const books = Store.getbooks();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }

  static removebook(isbn){

    const books = Store.getbooks();

    books.forEach((book,index)=>
    {if (book.isbn === isbn){
      books.splice(index, 1);
    }
  });


  localStorage.setItem('books', JSON.stringify(books));

  }
}



// event: Class:Display book
document.addEventListener('DOMContentLoaded',UI.displaybooks);



// event: Class:add book
document.querySelector('#book-form').addEventListener('submit',(e) =>
{
 //prevent actual submit

 e.preventDefault();


  //get values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // validate
  if(title === '' || author ==='' || isbn === ''){
    UI.showAlert('Please fill in all fields','danger');
  }else {

    //instantiate book
  const book = new Book(title,author,isbn);


  //Add book to UI
  UI.addbookToList(book);

  //Add book to store
  Store.addbook(book);

  // success message
  UI.showAlert('BookAdded','success');


 //Clear field
 UI.clearFields();

  }

  });




// event: Class:remove book
document.querySelector('#book-list').addEventListener('click',(e) => 
{
  // remove book from UI
 UI.deleteBook(e.target);

 //Remove book from store
 Store.removebook(e.target.parentElement.previousElementSibling.textContent);

 //show success message
   UI.showAlert('Book Removed','success');
});
