let log = console.log;

const form = document.querySelector("form");
const userBook = document.querySelector("#submit");

function openForm() {
  document.querySelector("form").style.display = "flex";
}

//Hides our form when btn is clicked
function closeform() {
  document.querySelector("form").style.display = "none";
}

// Our array of books
let myLibrary = [];

let title = "";
let author = "";
let pages = undefined;
let read = undefined;

//Results of our users form inputs, puts results into our variables
//Then creates our book, and adds it to our array
userBook.addEventListener("click", (e) => {
  title = document.querySelector("#bookTitle").value;
  author = document.querySelector("#bookAuthor").value;
  pages = document.querySelector("#bookPages").value;
  read = document.querySelector("#hasRead").checked;
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

function creatCard() {
  //Forgive, I don't know a better way to do this, yet.
  //Hopefully react will save me in the future
  const books = document.querySelector(".books");
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  <card class="info">
      <p class="title">The Dream of all things Possible</p>
      <p class="author">by Tolkien</p>
      <p class="pages">234 pages</p>
      <div>
          <p class="status">Status:</p>
          <span>Read</span>
      </div>
  </card>
  <div class="cardButton"><button class="delete">Delete</button></div>
</div>`;

  card.classList.add("card");
  books.appendChild(card);
}

log(myLibrary);
