// const books = [];
const RENDER_EVENT = 'render-book';
let queryCari = ''
const localStorageBook = 'book-storage';


document.addEventListener('DOMContentLoaded', function () {
    if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem(localStorageBook) === null) {
            localStorage.setItem(localStorageBook, JSON.stringify([]));
        }
        document.dispatchEvent(new Event(RENDER_EVENT));

        const submitForm = document.getElementById('inputBook');
        submitForm.addEventListener('submit', function (event) {
            event.preventDefault();
            addBook();
        });

        const searchSubmit = document.getElementById('searchSubmit');
        searchSubmit.addEventListener('submit', function (event) {
            event.preventDefault();
            queryCari = document.getElementById('searchBookTitle').value
            document.dispatchEvent(new Event(RENDER_EVENT));
        });
    } else {
        alert('Browser yang Anda gunakan tidak mendukung Web Storage');
    }
});


function addBook() {
    const books = JSON.parse(localStorage.getItem(localStorageBook))
    const inputBookTitle = document.getElementById('inputBookTitle').value;
    const inputBookAuthor = document.getElementById('inputBookAuthor').value;
    const inputBookYear = document.getElementById('inputBookYear').value;
    const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    books.push(bookObject);

    localStorage.setItem(localStorageBook, JSON.stringify(books));

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return +new Date();
}


function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const books = JSON.parse(localStorage.getItem(localStorageBook))
    const uncompletedTODOList = document.getElementById('incompleteBookshelfList');
    const completedTODOList = document.getElementById('completeBookshelfList');
    uncompletedTODOList.innerHTML = '';
    completedTODOList.innerHTML = '';

    for (const bookItem of books) {
        if (bookItem.isComplete && bookItem.title.includes(queryCari)) {
            const bookElement = completeBook(bookItem);
            completedTODOList.append(bookElement);
        } else if ((!bookItem.isComplete) && bookItem.title.includes(queryCari)) {
            const bookElement = incompleteBook(bookItem);
            uncompletedTODOList.append(bookElement);
        }

    }
});

function incompleteBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textPenulis = document.createElement('p');
    textPenulis.innerText = 'Penulis: ' + bookObject.author;

    const textTahun = document.createElement('p');
    textTahun.innerText = 'Tahun: ' + bookObject.year;

    const btnSelesai = document.createElement('button');
    btnSelesai.innerHTML = 'Selesai dibaca'
    btnSelesai.classList.add('green');

    btnSelesai.addEventListener('click', function () {
        pindahBuku(bookObject.id);
    });

    const btnHapus = document.createElement('button');
    btnHapus.innerHTML = 'Hapus buku'
    btnHapus.classList.add('read');

    btnHapus.addEventListener('click', function () {
        removeBook(bookObject.id);
    });

    const divAction = document.createElement('div');
    divAction.classList.add('action');
    divAction.append(btnSelesai, btnHapus)

    const articleBook = document.createElement('article');
    articleBook.classList.add('book_item')
    articleBook.append(textTitle, textPenulis, textTahun, divAction)

    articleBook.setAttribute('id', `book-${bookObject.id}`);

    return articleBook;
}

function completeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;

    const textPenulis = document.createElement('p');
    textPenulis.innerText = 'Penulis: ' + bookObject.author;

    const textTahun = document.createElement('p');
    textTahun.innerText = 'Tahun: ' + bookObject.year;

    const btnSelesai = document.createElement('button');
    btnSelesai.innerHTML = 'Belum selesai di Baca'
    btnSelesai.classList.add('green');

    btnSelesai.addEventListener('click', function () {
        pindahBuku(bookObject.id);
    });

    const btnHapus = document.createElement('button');
    btnHapus.innerHTML = 'Hapus buku'
    btnHapus.classList.add('read');

    btnHapus.addEventListener('click', function () {
        removeBook(bookObject.id);
    });

    const divAction = document.createElement('div');
    divAction.classList.add('action');
    divAction.append(btnSelesai, btnHapus)

    const articleBook = document.createElement('article');
    articleBook.classList.add('book_item')
    articleBook.append(textTitle, textPenulis, textTahun, divAction)

    articleBook.setAttribute('id', `book-${bookObject.id}`);

    return articleBook;
}

function pindahBuku(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = !bookTarget.isComplete;
    updateDataBook(bookTarget)
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
    const books = JSON.parse(localStorage.getItem(localStorageBook))
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function removeBook(bookId) {
    const books = JSON.parse(localStorage.getItem(localStorageBook))
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    books.splice(bookTarget, 1);
    localStorage.setItem(localStorageBook, JSON.stringify(books))
    document.dispatchEvent(new Event(RENDER_EVENT));
    return books
}

function updateDataBook(book){
    const books = JSON.parse(localStorage.getItem(localStorageBook))
    const bookTarget = findBook(book.id);
    books.splice(bookTarget, 1);
    books.push(book)
    localStorage.setItem(localStorageBook, JSON.stringify(books))
}

