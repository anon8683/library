let log = console.log;
const userTitle = document.querySelector("#title");
const userAuthor = document.querySelector("#author");
const userPages = document.querySelector("#pages");
const userRead = document.querySelector("#read");

// Our array of books
let myLibrary = [];

let title = "";
let author = "";
let pages = undefined;
let read = undefined;

userTitle.addEventListener("change", (e) => {
  title = userTitle.value;
});

userAuthor.addEventListener("change", (e) => {
  author = userAuthor.value;
});

userPages.addEventListener("change", (e) => {
  pages = userPages.value;
});

userRead.addEventListener("change", (e) => {
  read = userRead.value;
  addBookToLibrary(createBook());
});

//Our constructor
const Book = {
  info: function () {
    let read = "read it";
    if (this.read === false) {
      read = "not read it";
    }
    return `${this.title} by ${this.author}, ${this.pages}, ${read}`;
  },
};

//Adds our book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
  log(myLibrary);
  domTitle.textContent = Object.values(myLibrary[0])[0];
}

//This function creates a book object
function createBook() {
  {
    let books = Object.create(Book);
    books.title = title;
    books.author = author;
    books.pages = pages;
    books.read = read;
    return books;
  }
}

log(myLibrary);
