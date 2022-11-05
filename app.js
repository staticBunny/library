const main = document.querySelector('.main');

const addBook = document.getElementById("add-book");
const form = document.getElementById("add-book-form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submitbtn = document.getElementById("submit");

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

form.style.display = "none";

addBook.addEventListener("click", () => {
	form.style.display = "block";
})

let titleName = "";
title.addEventListener("input", () => {
	titleName = title.value;
})

let authorName = "";
author.addEventListener("input", () => {
	authorName = author.value;
})

let pagesNum = "";
pages.addEventListener("input", () => {
	pagesNum = pages.value;
})

let readStatus = false;
read.addEventListener("change", () => {
	readStatus = read.checked;
})


submitbtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (titleName === "" || authorName === "" || pagesNum === "") {
		alert("Please fill out all fields");
		return;
	}

	const book = new Book(titleName, authorName, pagesNum, readStatus);
	myLibrary.push(book);
	renderNewBook(book);
	clearForm();
	form.style.display = "none";
})

function renderNewBook(book) {
	const bookDiv = document.createElement("div");
	bookDiv.classList.add("book");

	const titleDiv = document.createElement("div");
	titleDiv.classList.add("title");
	titleDiv.textContent = book.title;

	const authorDiv = document.createElement("div");
	authorDiv.classList.add("author");
	authorDiv.textContent = book.author;

	const pagesDiv = document.createElement("div");
	pagesDiv.classList.add("pages");
	pagesDiv.textContent = book.pages;

	const readDiv = document.createElement("div");
	readDiv.classList.add("read");
	if (book.read) {
		readDiv.textContent = "Read";
	}
	else {
		readDiv.textContent = "Not Read";
	}

	bookDiv.appendChild(titleDiv);
	bookDiv.appendChild(authorDiv);
	bookDiv.appendChild(pagesDiv);
	bookDiv.appendChild(readDiv);

	main.appendChild(bookDiv);
}

function clearForm() {
	titleName = ""; authorName = ""; pagesNum = ""; readStatus = false;
	title.value = ""; author.value = ""; pages.value = ""; 
	read.checked = false
}
