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
  creatCard();
});

//Event listener for delete buttons

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

let deleteButton = document.querySelectorAll(".delete");

function creatCard() {
  //Forgive, I don't know a better way to do this, yet.
  //Hopefully react will save me in the future
  let bookNumber = myLibrary.length;

  const books = document.querySelector(".books");
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", `a${bookNumber}`);
  card.innerHTML = `
  <card class="info" id="a${bookNumber}">
      <p class="title" id="a${bookNumber}">${title}</p>
      <p class="author" id="a${bookNumber}">by ${author}</p>
      <p class="pages" id="a${bookNumber}">${pages}</p>
      <div>
          <p class="status" id="a${bookNumber}">Status:</p>
          <span>${read}</span>
      </div>
  </card>
  <div class="cardButton" id="a${bookNumber}">
  <button class="delete"onclick="deleteCard(this.id)" id="a${bookNumber}">Delete</button></div>
</div>`;
  //Card gets added
  books.appendChild(card);
}

function deleteCard(id) {
  document.getElementById(`${id}`).remove();
}
