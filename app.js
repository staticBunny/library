const main = document.querySelector('.main');

const addBook = document.getElementById("add-book");
const form = document.getElementById("add-book-form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submitbtn = document.getElementById("submit");

const statusOfBooks = Array.from(document.querySelectorAll(".read"));

const formChildren = Array.from(form.querySelectorAll("*"));


function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

form.style.display = "none";

addBook.addEventListener("click", () => {
	form.style.display = "grid";
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
	renderNewBook(book);
	clearForm();
	form.style.display = "none";
})

function switchReadStatus() {
	statusOfBooks.forEach((status) => {
		status.addEventListener("click", () => {
			if (status.textContent == "Read") {
				status.textContent = "Not Read";
				status.style.backgroundColor = "#ffcccb";
			}
			else {
				status.textContent = "Read";
				status.style.backgroundColor = "lightgreen";
			}
		})
	})
}
switchReadStatus();

document.addEventListener("click", (e) => {
	if (!isWithinForm(e.target)) {
		form.style.display = "none";
		clearForm();
	}
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
	pagesDiv.textContent = book.pages.concat(" pages");

	const readButton = document.createElement("button");
	if (book.read) {
		readButton.textContent = "Read";
		readButton.style.backgroundColor = "lightgreen";
	}
	else {
		readButton.textContent = "Not Read";
		readButton.style.backgroundColor = "#ffcccb";
	}
	readButton.classList.add("read");
	statusOfBooks.push(readButton);
	switchReadStatus();

	bookDiv.appendChild(titleDiv);
	bookDiv.appendChild(authorDiv);
	bookDiv.appendChild(pagesDiv);
	bookDiv.appendChild(readButton);

	main.appendChild(bookDiv);
}

function clearForm() {
	titleName = ""; authorName = ""; pagesNum = ""; readStatus = false;
	title.value = ""; author.value = ""; pages.value = ""; 
	read.checked = false
}

function isWithinForm(target) {
	if (target == form || target == addBook) {
		return true;
	}
	if (formChildren.includes(target)) {
		return true;
	}
	return false;
}
