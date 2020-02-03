'use strict';
const bookList = document.querySelector('.books__list');
const bookName = document.getElementById('book__name');
const pages = document.getElementById('pages__count');
const bookAuthor = document.getElementById('book__author');
const bookDescriptions = document.getElementById('book__descriptions');
let books=[];
let countBooks = 0;
const clearInput=()=>{bookName.value = bookAuthor.value = bookDescriptions.value = pages.value = '';}
class Book {
	constructor(bookName, bookAuthor, descriptions, pages){
		this.bookName = bookName;
		this.bookAuthor = bookAuthor;
		this.descriptions = descriptions;
		this.pages = pages;
	}
	addBook(book){
		let li = document.createElement('li');
		li.classList.add('book__card');
		li.innerHTML=`
			<li class="book_wrapper">
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
		setTimeout(()=>{ li.style.opacity = 1 }, 500);
		bookList.appendChild(li);
	}
	static getBook(){
		books = JSON.parse(localStorage.getItem('books'));
		books === null ? books=[] : books.forEach(book =>new Book().addBook(book))	
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
class Page{
	constructor(){
	}
	static getPages(){
		let count = localStorage.getItem("pages")
		document.querySelector('.card__body__pages').innerHTML = count;
	}
	static eventsPages(pages){
		let countPages = +localStorage.getItem("pages");
		countPages += pages;
		localStorage.setItem("pages", +countPages);
		document.querySelector('.card__body__pages').innerText = countPages;
	}
	static addPages(pages){
		Page.eventsPages(+pages);
	}
	static removePages(pages){
		Page.eventsPages(-(+pages));
	}
}
class BookEvents {
	constructor(){
	}
	static addBookInLS(newBook){
		books.push(newBook);
		localStorage.setItem("books",JSON.stringify(books));
	}
	static getCountBook(){
		books.forEach(book => {
			countBooks++;
			return countBooks;	
		})
		document.querySelector('.card__body__books').innerText = countBooks;
	}
	static addCountBook(){
		countBooks++;
		document.querySelector('.card__body__books').innerText = countBooks;
	}
	static removeCountBook(){
		countBooks--;
		document.querySelector('.card__body__books').innerText = countBooks;
	}
}
//get Books and Pages when loading a document
document.addEventListener("DOMContentLoaded",() =>{
	Book.getBook();
	Page.getPages();
	BookEvents.getCountBook();
});
//add Books, pages and clear inputs
document.querySelector('.main__form').addEventListener('submit',(event)=>{
	event.preventDefault();
	const newBook = new Book(bookName.value, bookAuthor.value, bookDescriptions.value, pages.value);
	newBook.addBook(newBook);
	BookEvents.addBookInLS(newBook);
	Page.addPages(pages.value);
	clearInput();
	BookEvents.addCountBook();
})
//remove Books, pages at the click of a button
bookList.addEventListener('click', (event)=>{
	 let li = event.target.parentNode.parentNode.parentNode;
	 let nameBook = event.target.parentNode;
	 if(event.target.dataset.button === 'delete'){
	 	li.remove();
	 	Book.deleteBook(nameBook.childNodes[0].textContent);
	    Page.removePages(nameBook.childNodes[4].textContent);
	    BookEvents.removeCountBook();
	 }
});
	
