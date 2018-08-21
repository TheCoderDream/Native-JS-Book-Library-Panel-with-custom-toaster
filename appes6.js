class UI {

    addBooToList(book) {

        if(book.title === '' || book.author === '' || book.isbn === '') {
            Toaster('#toaster','Please fill all the fields', 'warning', 3 );
            return;
        }
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
        Toaster('#toaster', 'Book has been added', 'success', 3 );
    }

    deleteBook(target) {
        if(target.className === 'fa fa-remove') {
            target.parentElement.parentElement.remove();
            Toaster('#toaster', 'Book has been removed', 'danger', 3);
        }
    }
}

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

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

document.getElementById('book-form').addEventListener('submit',
    function (e) {
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;


        const book = new Book(title, author, isbn);

        const ui = new UI();

        ui.addBooToList(book);


        e.preventDefault();
    });

document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();

    console.log(e.target);

    ui.deleteBook(e.target);

    e.preventDefault();

});