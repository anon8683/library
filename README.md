# myLibrary

This a simple CRUD application that allows user to keep track of books they are interested in, or have read. It is responsive and mobile friendly.
Users are able to submit books with information, title, author, amount of pages and whether they've read the book or not. Once the user adds the book a `card` is displayed with the books info.

You can delete the book from the library, or you can change the READ status by clicking a checkbox. Both of these actions will update the array of objects, depending on whether the book has been changed or deleted.
There are also some stats on how many books there are total in the library and how many are read or unread.
If you want to add 5 random books, you can click the`Random books` button. These are generated from hardcoded random books list consisting of 9 books.

### Things to add in the future

- search function, search for a book in your library
- potential random books from API, not hardcoded
- more book stats
  - ability to input amount of pages you've read so far
  - total pages read
