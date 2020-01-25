'use strict';
//
const mainForm = document.querySelector('.main-form');
const bookList = document.querySelector('.books-list');
//inputs
const bookName = document.getElementById('book-name');
const pages = document.getElementById('pages-count');
const bookAuthor = document.getElementById('book-author');
const bookDescriptions = document.getElementById('book-descriptions');
//book item
const card = document.querySelector('.books-list');
//element of read pages
const readPages = document.querySelector('.read-pages')

let books=[];
let countSum = 0;

class Book {

	constructor(bookName, bookAuthor, descriptions, pages){
		this.bookName = bookName;
		this.bookAuthor = bookAuthor;
		this.descriptions = descriptions;
		this.pages = pages;
	}

	addBook(book){
		let contentLi=document.createElement('li');
		contentLi.innerHTML=`
			<li>
				<div class="card" style="width: 18rem;">
  					<div class="card-body book-item"><h5 class="card-title">${book.bookName}</h5><h5 class="card-title">${book.bookAuthor}</h5><h5 class="card-title">${book.pages}</h5><p class="card-text">${book.descriptions}</p><button type="button" data-button='delete' class="btn btn-outline-danger delete">Danger</button></div>
				</div>
			</li>`;
		bookList.appendChild(contentLi);
	}

	static getBook(){
		books = JSON.parse(localStorage.getItem('books'));
		books === null ? books=[] : books.forEach(book => new Book().addBook(book) )	
	}

	static deleteBook(name){
		books = JSON.parse(localStorage.getItem('books'));
		books.forEach((book, index) => {
			if(book.bookName === name){
				books.splice(index,1);
				localStorage.setItem("books",JSON.stringify(books));
			}
		})
    
	}

}

class UIevents{
	constructor(){

	}
	static clearInput(){
		bookName.value = bookAuthor.value = bookDescriptions.value = pages.value = '';
	}
	static readPages(){
		let count = localStorage.getItem("pages")
		readPages.innerHTML = count;
	}
	static countPages(count){
		countSum += +count;
		localStorage.setItem("pages", +countSum);
		readPages.innerText = countSum;
	}
	static removePages(count){
		let countSum = +localStorage.getItem("pages")
		countSum -= +count;
		localStorage.setItem("pages", +countSum);
		readPages.innerText = countSum;
	}
}

mainForm.addEventListener('submit',(event)=>{
	event.preventDefault();
	const newBook = new Book(bookName.value, bookAuthor.value, bookDescriptions.value, pages.value);
	newBook.addBook(newBook);
	books.push(newBook);
	localStorage.setItem("books",JSON.stringify(books));
	UIevents.countPages(pages.value);
	UIevents.clearInput(+pages.value);
})

document.addEventListener("DOMContentLoaded", Book.getBook());
document.addEventListener("DOMContentLoaded", UIevents.readPages());

card.addEventListener('click', (event)=>{
	let li = event.target.parentNode.parentNode.parentNode;
	let nameBook = event.target.parentNode;
	if(event.target.dataset.button==='delete'){
		li.remove();
		Book.deleteBook(nameBook.childNodes[0].textContent);
		UIevents.removePages(+nameBook.childNodes[2].textContent);
	}
});
	
