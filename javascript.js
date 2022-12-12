let log = console.log;

const form = document.querySelector("form");
const userBook = document.querySelector("#submit");

function openForm() {
  document.querySelector("form").style.display = "flex";
  document.getElementById("form").style.display = "block";
}

//Hides our form when btn is clicked
function closeform() {
  document.querySelector("form").style.display = "none";
  document.getElementById("form").style.display = "none";
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
  createCard();
  document.querySelector("#bookTitle").value = "";
  document.querySelector("#bookAuthor").value = "";
  document.querySelector("#bookPages").value = "";
  document.querySelector("#hasRead").checked = undefined;
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
  adjustStorage();

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

function createCard() {
  //Forgive, I don't know a better way to do this, yet.
  //Hopefully react will save me in the future
  let bookNumber = myLibrary.length;
  let checkBoxStatus = "";
  if (read === true) {
    checkBoxStatus = "checked=true";
  }

  const books = document.querySelector(".books");
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(`${read}`);
  card.setAttribute("id", `a${bookNumber}`);
  card.innerHTML = `
  <card class="info" id="a${bookNumber}">
      <p class="title" id="a${bookNumber}">${title}</p>
      <p class="author" id="a${bookNumber}">by ${author}</p>
      <p class="pages" id="a${bookNumber}">${pages} pages</p>
      <div class="hasRead">
          <p class="status" id="a${bookNumber}">Finished:</p>
          <input type="checkbox" class="checkBox" ${checkBoxStatus} onclick="changeStatus(this.id)" id="readCheckBox${bookNumber}">
      </div>
  </card>
  <div class="cardButton" id="a${bookNumber}">
  <button class="delete"onclick="deleteCard(this.id)" id="a${bookNumber}">Delete</button>
  </div>
</div>`;
  //Card gets added
  books.appendChild(card);
}

// Clicking a chexkbox will update it's attribute to check or not checked depending on previous state
function changeStatus(id) {
  let box = document.getElementById(`${id}`);
  let bookIndex = +id.slice(-1) - 1;
  let card = document.getElementById(`a${bookIndex + 1}`);

  if (box.getAttribute("checked") === null) {
    box.setAttribute("checked", "true");
    myLibrary[bookIndex].read = true;
    card.classList.add("true");
    adjustStorage();

    return;
  }
  box.removeAttribute("checked");
  myLibrary[bookIndex].read = false;
  card.classList.remove("true");
  adjustStorage();
}

function deleteCard(id) {
  let index = +id.slice(1) - 1;
  log(index);
  document.getElementById(`${id}`).remove();
  delete myLibrary[index];
  adjustStorage();
}

//When radom data button is clicked call addRandomBooks multiple times
function callRandom() {
  for (let index = 0; index < 5; index++) {
    addRandomBooks();
  }
}

function addRandomBooks() {
  let randomRead = [true, false, true, false];

  let randomArray = [
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      pages: 334,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      pages: 366,
    },
    {
      title: "A Tale of Two Cities",
      author: "Charles Dickens",
      pages: 489,
    },
    {
      title: "The Raven",
      author: "Edgar Allan Poe",
      pages: 64,
    },
  ];
  let randomChoice = Math.floor(Math.random() * 4);
  title = randomArray[randomChoice].title;
  author = randomArray[randomChoice].author;
  pages = randomArray[randomChoice].pages;
  read = randomRead[randomChoice];

  addBookToLibrary(createBook());
  createCard();
}

function adjustStorage() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function getStorage() {
  let saved_books = JSON.parse(localStorage.getItem("books")).filter((n) => n);
  return saved_books;
}

//On load, if storage is not null, parse the storage string into an object array
// and filter out null spaces
// For each item in new array, create a book from it
window.addEventListener("load", (e) => {
  if (localStorage.getItem("books") != null) {
    let saved_books = JSON.parse(localStorage.getItem("books")).filter(
      (n) => n
    );
    log(saved_books);
    for (let index = 0; index < saved_books.length; index++) {
      title = saved_books[index].title;
      author = saved_books[index].author;
      pages = saved_books[index].pages;
      read = saved_books[index].read;
      addBookToLibrary(createBook());
      createCard();
    }
  }
});
