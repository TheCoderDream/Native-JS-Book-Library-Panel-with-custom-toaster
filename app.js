function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    
}

function Store() {
}

Store.prototype.displayBooks = function () {
    const books = Store.prototype.getBooks();

    books.forEach(function (book) {
        UI.prototype.addBookToList(book);
    })
};

Store.prototype.addBook = function (book) {
    const books = Store.prototype.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

};
Store.prototype.removeBook = function (isbn) {
    const books = Store.prototype.getBooks();

    const filterBooks = books.filter(function (book) {
        return book.isbn !== isbn;
    });

    localStorage.setItem('books', JSON.stringify(filterBooks));

};
Store.prototype.getBooks = function () {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
};

function Toaster(appendableParent, message, type, time) {
    const validTypes = ['success','info', 'warning','danger','primary','secondary','dark','light'];
    const parent = document.querySelector(appendableParent);
    const alertDiv = document.createElement('div');
    const alertMessageP = document.createElement('p');
    const dismissLink = document.createElement('button');

    if(!(validTypes.indexOf(type) > -1)) {
        throw new Error('İnvalid Type');
    }


    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');

    alertMessageP.innerText = message;


    dismissLink.setAttribute('type', 'button');
    dismissLink.setAttribute('data-dismiss', 'alert');
    dismissLink.setAttribute('aria-label', 'close');
    dismissLink.setAttribute('title', 'close');
    dismissLink.className = 'close';
    dismissLink.innerHTML = `<span aria-hidden="true">&times;</span>`;
    alertDiv.appendChild(dismissLink);


    alertDiv.appendChild(alertMessageP);



    parent.appendChild(alertDiv);

    setTimeout(function () {
        parent.remove();
    } , time*1000);

}

function UI() {
    
}


UI.prototype.addBookToList = function(book) {

        const bookList = document.getElementById('book-list');

        const row = document.createElement('tr');

        const bookValues = Object.values(book);
        console.log(bookValues);



        const tableDatasArr = [];
        for(let i = 0; i < 3; i++) {
            const tableData = document.createElement('td');
            tableData.innerText = bookValues[i];
            tableDatasArr.push(tableData);
        }
        const tableData = document.createElement('td');
        const deleteLink = document.createElement('i');
        deleteLink.className = 'fa fa-remove';
        deleteLink.style.cursor = 'pointer';
        tableData.appendChild(deleteLink);

        tableDatasArr.push(tableData);

        tableDatasArr.forEach(function (td) {
            row.appendChild(td) ;
        });


        bookList.appendChild(row);
        this.clearFields();



};

UI.prototype.deleteBook = function(target) {
  if(target.className === 'fa fa-remove') {
      target.parentElement.parentElement.remove();
      Toaster('#toaster', 'Book has been removed', 'danger', 3);
      console.log(target.parentElement.previousElementSibling.textContent);
      Store.prototype.removeBook(target.parentElement.previousElementSibling.textContent);

  }
};

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};


document.getElementById('book-form').addEventListener('submit',
    function (e) {
       const title = document.getElementById('title').value,
             author = document.getElementById('author').value,
             isbn = document.getElementById('isbn').value;


       const book = new Book(title, author, isbn);

       const ui = new UI();




        if(book.title === '' || book.author === '' || book.isbn === '') {
            Toaster('#toaster','Please fill all the fields', 'warning', 3 );
        } else {
            UI.prototype.addBookToList(book);
            Store.prototype.addBook(book);
            Toaster('#toaster', 'Book has been added', 'success', 3 );
        }


       e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();

    console.log(e.target);

    ui.deleteBook(e.target);

    e.preventDefault();

});

document.addEventListener('DOMContentLoaded', Store.prototype.displayBooks);