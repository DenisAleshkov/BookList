'use strict';
//
const mainForm = document.querySelector('.main__form');
const bookList = document.querySelector('.books__list');
//inputs
const bookName = document.getElementById('book__name');
const pages = document.getElementById('pages__count');
const bookAuthor = document.getElementById('book__author');
const bookDescriptions = document.getElementById('book__descriptions');
//element of read pages
const readPages = document.querySelector('.card__body__pages')
let books=[];


class Book {
	constructor(bookName, bookAuthor, descriptions, pages){
		this.bookName = bookName;
		this.bookAuthor = bookAuthor;
		this.descriptions = descriptions;
		this.pages = pages;
	}
	addBook(book){
		let li = document.createElement('li');
		li.innerHTML=`
			<li>
				<div class="card" style="width: 18rem;">
  					<div class="card-body book-item"><h5 class="card-title">${book.bookName}</h5>
  						<h5 class="card-title">${book.bookAuthor}</h5>
  						<h5 class="card-title">${book.pages}</h5>
  						<p class="card-text">${book.descriptions}</p>
  						<button type="button" data-button='delete' class="btn btn-outline-danger delete">
  							Delete
  						</button>
  					</div>
  				</div>
			</li>`;
		bookList.appendChild(li);
	}
	static getBook(){
		books = JSON.parse(localStorage.getItem('books'));
		books === null ? books=[] : books.forEach(book => new Book().addBook(book))	
	}
	static deleteBook(name){
		books = JSON.parse(localStorage.getItem('books'));
		books.forEach((book, index) => {
			if(book.bookName === name){
				books.splice(index,1);//delete 1 element from index
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
	static getPages(){
		let count = localStorage.getItem("pages")
		readPages.innerHTML = count;
	}
	static eventsPages(pages){
		let countSum = +localStorage.getItem("pages");
		countSum += pages;
		localStorage.setItem("pages", +countSum);
		readPages.innerText = countSum;
	}
	static addPages(pages){
		UIevents.eventsPages(+pages);
		
	}
	static removePages(pages){
		UIevents.eventsPages(-(+pages));
	}
	static addBookInLS(newBook){
		books.push(newBook);
		localStorage.setItem("books",JSON.stringify(books));
	}
}
//get Books and Pages when loading a document
document.addEventListener("DOMContentLoaded",() =>{
	Book.getBook();
	UIevents.getPages();
});
//add Books, pages and clear inputs
mainForm.addEventListener('submit',(event)=>{
	event.preventDefault();
	const newBook = new Book(bookName.value, bookAuthor.value, bookDescriptions.value, pages.value);
	newBook.addBook(newBook);
	UIevents.addBookInLS(newBook);
	UIevents.addPages(pages.value);
	UIevents.clearInput();
})
//remove Books, pages at the click of a button
bookList.addEventListener('click', (event)=>{
	 let li = event.target.parentNode.parentNode.parentNode;
	 let nameBook = event.target.parentNode;
	 if(event.target.dataset.button==='delete'){
	 	li.remove();
	 	Book.deleteBook(nameBook.childNodes[0].textContent);
	    UIevents.removePages(nameBook.childNodes[4].textContent);
	 }
});
	
