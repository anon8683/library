const form = document.querySelector("form");
const userBook = document.querySelector("#submit");
let deleteButton = document.querySelectorAll(".delete");
// Our array of books
let myLibrary = [];

//Variables
let title = "";
let author = "";
let pages = undefined;
let read = undefined;

//Displays form when button is clicked
function openForm() {
	document.querySelector("form").style.display = "flex";
	document.getElementById("form").style.display = "block";
}

//Hides our form when btn is clicked
function closeform() {
	document.querySelector("form").style.display = "none";
	document.getElementById("form").style.display = "none";
}

//Results of our users form inputs, puts results into our variables
//Then creates our book, and adds it to our array, creates card from given inputs
userBook.addEventListener("click", (e) => {
	title = document.querySelector("#bookTitle").value;
	author = document.querySelector("#bookAuthor").value;
	pages = document.querySelector("#bookPages").value;
	read = document.querySelector("#hasRead").checked;
	addBookToLibrary(createBook());
	createCard();

	//Reset input values after card creation
	document.querySelector("#bookTitle").value = "";
	document.querySelector("#bookAuthor").value = "";
	document.querySelector("#bookPages").value = "";
	document.querySelector("#hasRead").checked = undefined;
});

//Our constructor
// const Book = {
// 	info: function () {
// 		let read = "read it";
// 		if (this.read === false) {
// 			read = "not read it";
// 		}
// 		return `${this.title} by ${this.author}, ${this.pages}, ${read}`;
// 	},
// };

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	get info() {
		let read = "read it";
		if (this.read === false) {
			read = "not read it";
		}
		return `${this.title} by ${this.author}, ${this.pages}, ${read}`;
	}
}

//Adds our book to the library
function addBookToLibrary(book) {
	myLibrary.push(book);
	adjustStorage();
}

//This function creates a book object
function createBook() {
	const books = new Book(title, author, pages, read);
	return books;
}

function totalbooks() {
	//Updates our book stats text content
	const totalBooks = document.getElementById("totalBooksResult");
	const booksRead = document.getElementById("booksReadResult");

	// Our array without null spaces, so we can get the real length
	let realTotal = myLibrary.filter((n) => n);
	// total amount of books is equal to the length of library without null
	totalBooks.textContent = `${realTotal.length}`;

	// iterates through null free array, if the object.read is true, add to amount read
	let read = 0;
	for (let i = 0; i < realTotal.length; i++) {
		if (realTotal[i].read === true) {
			read++;
		}
	}
	//Sets text content to amount of books read, after for loop has finished
	booksRead.textContent = `${read}`;

	// books unread is equal to total books - readBooks
	const booksUnread = document.getElementById("booksUnreadResult");
	let unreadBooks = realTotal.length - read;
	booksUnread.textContent = `${unreadBooks}`;
}

function createCard() {
	//Calls totalBooks to update the stats on card creation
	totalbooks();
	const books = document.querySelector(".books");
	const card = document.createElement("div");

	// Lets us get unique ID's by using the length of library
	let bookNumber = myLibrary.length;

	// Card checkbox is default not checked, if user has read the book,
	// set to Checked
	let checkBoxStatus = "";
	if (read === true) {
		checkBoxStatus = "checked=true";
	}

	//Our card HTML that will be created
	//Book number will give unique ID's, "a" is before bookNumber because ID's can't start with
	// a number
	card.classList.add("card");

	//add class based on read status, changes card background
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
	// ID of element clicked is parsed in, and then stripped at -1,
	// because our last character will always be the unique ID number
	// then minus 1 to get our index of the book object being updated

	let box = document.getElementById(`${id}`);
	let bookIndex = +id.slice(-1) - 1;
	let card = document.getElementById(`a${bookIndex + 1}`);

	// if the checkbox clicked does not have "checked" attribute then read = false,
	// give it "checked" attribute and use the index to change "read" on the object to true,
	// and give the card a class of true

	if (box.getAttribute("checked") === null) {
		box.setAttribute("checked", "true");
		myLibrary[bookIndex].read = true;
		card.classList.add("true");

		// adjust our storage with the updated object and our book stats since
		// the amount of read/not read books has changed
		adjustStorage();
		totalbooks();

		return;
	}
	//otherwise remove checked attribute and class
	box.removeAttribute("checked");
	myLibrary[bookIndex].read = false;
	card.classList.remove("true");
	adjustStorage();
	totalbooks();
}

//
function deleteCard(id) {
	// ID is parsed in when delete is clicked, index of object to delete id-1
	// remove all elements from the DOM with the given ID
	// delete the object from the library Array, leaves a null space because of delete

	let index = +id.slice(1) - 1;
	document.getElementById(`${id}`).remove();
	delete myLibrary[index];
	totalbooks();
	adjustStorage();
}

//When radom data button is clicked call addRandomBooks multiple times
function callRandom() {
	for (let index = 0; index < 5; index++) {
		addRandomBooks();
	}
}

// When random button is clicked, add a random set of books from this function
function addRandomBooks() {
	let randomRead = false;

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
		{
			title: "The Legend of Sleepy Hollow",
			author: "Washington Irving",
			pages: 108,
		},
		{
			title: "The Tell-Tale Heart",
			author: "Edgar Allan Poe",
			pages: 31,
		},
		{
			title: "To Kill a Mockingbird",
			author: "Harper Lee",
			pages: 336,
		},
		{
			title: "Harry Potter and the Sorcerer's Stone",
			author: "J.K. Rowling",
			pages: 309,
		},
		{
			title: "The Book Thief",
			author: "Markus Zusak",
			pages: 552,
		},
	];
	let randomChoice = Math.floor(Math.random() * 9);
	if (randomChoice > 5) {
		randomRead = true;
	}

	title = randomArray[randomChoice].title;
	author = randomArray[randomChoice].author;
	pages = randomArray[randomChoice].pages;
	read = randomRead;

	addBookToLibrary(createBook());
	createCard();
}

//turns our library into a string and puts it into storage
function adjustStorage() {
	localStorage.setItem("books", JSON.stringify(myLibrary));
}

//returns our library string and parses it into objects while removing all null spaces
function getStorage() {
	let saved_books = JSON.parse(localStorage.getItem("books")).filter((n) => n);
	return saved_books;
}

//On load, if storage is not null, parse the storage string into an object array
// and filter out null spaces
// For each item in new array, create a book from it
window.addEventListener("load", (e) => {
	if (localStorage.getItem("books") != null) {
		let saved_books = getStorage();
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
