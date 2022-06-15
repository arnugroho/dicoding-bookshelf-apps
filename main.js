const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});


function addBook() {
    const inputBookTitle = document.getElementById('inputBookTitle').value;
    const inputBookAuthor = document.getElementById('inputBookAuthor').value;
    const inputBookYear = document.getElementById('inputBookYear').value;
    const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    books.push(bookObject);

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
    console.log(books);
    const uncompletedTODOList = document.getElementById('incompleteBookshelfList');
    const completedTODOList = document.getElementById('completeBookshelfList');
    uncompletedTODOList.innerHTML = '';
    completedTODOList.innerHTML = '';

    for (const bookItem of books) {
        if(bookItem.isComplete){
            const bookElement = completeBook(bookItem);
            completedTODOList.append(bookElement);
        } else {
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

    const btnHapus = document.createElement('button');
    btnHapus.innerHTML = 'Hapus buku'
    btnHapus.classList.add('read');

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

    const btnHapus = document.createElement('button');
    btnHapus.innerHTML = 'Hapus buku'
    btnHapus.classList.add('read');

    const divAction = document.createElement('div');
    divAction.classList.add('action');
    divAction.append(btnSelesai, btnHapus)

    const articleBook = document.createElement('article');
    articleBook.classList.add('book_item')
    articleBook.append(textTitle, textPenulis, textTahun, divAction)

    articleBook.setAttribute('id', `book-${bookObject.id}`);

    return articleBook;
}