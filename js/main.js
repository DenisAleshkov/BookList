'use strict';
const bookList = document.querySelector('.books__list');
const bookName = document.getElementById('book__name');
const pages = document.getElementById('pages__count');
const bookAuthor = document.getElementById('book__author');
const bookDescriptions = document.getElementById('book__descriptions');
let books=[];
let countBooks = 0;
const clearInput=()=>{bookName.value = bookAuthor.value = bookDescriptions.value = pages.value = '';};
// generates 10 random numbers in an array and divides by their number
const getRandomInt = () => {
  	let array = new Uint32Array(10);
	window.crypto.getRandomValues(array);
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
    	sum += array[i];
    	return Math.ceil(sum / (array.length-1));
	}
}
class Book {
	constructor(bookName, bookAuthor, descriptions, pages, id){
		this.bookName = bookName;
		this.bookAuthor = bookAuthor;
		this.descriptions = descriptions;
		this.pages = pages;
		this.id = id;
	}
	addBook(book){
		let li = document.createElement('li');
		li.classList.add('book__card');
		li.innerHTML=`
			<li class="book_wrapper">
				<div class="card" style="width: 18rem;">
  					<div class="card-body book-item">Book name:<h5 class="card-title">${book.bookName}</h5>
  					Book author:<h5 class="card-title">${book.bookAuthor}</h5>
  					pages:<h5 class="card-title">${book.pages}</h5>
  					Descriptions:<p class="card-text">${book.descriptions}</p>
  					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
						<button class='variousamechanics'>
  							<div class='cleverlypaired'>
    							<i class='fa fa-trash-o'></i>
    							<i class='fa fa-question'></i>
    							<i class='fa fa-check'></i>
  							</div>
  							<div class='kedeverything'>
    							<span>Удалить!</span>
  							</div>
						</button>
  					<button type="button" data-button='delete' class="btn btn-outline-danger delete">
  						Delete
  					</button><p class="card-text">${book.id}</p>
  					</div>
  				</div>
			</li>`;
		setTimeout(()=>{ li.style.opacity = 1 }, 100);
		bookList.appendChild(li);
	}
	static getBook(){
		books = JSON.parse(localStorage.getItem('books'));
		books === null ? books=[] : books.forEach(book =>new Book().addBook(book))	
	}
	static deleteBook(id){
		books = JSON.parse(localStorage.getItem('books'));
		books.forEach((book, index) => {
			if(book.id === +id){
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
	const newBook = new Book(bookName.value, bookAuthor.value, bookDescriptions.value, pages.value, getRandomInt());
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
	 	Book.deleteBook(nameBook.childNodes[10].textContent);
	 	console.log("nameBook.childNodes", nameBook.childNodes);
	    Page.removePages(nameBook.childNodes[5].textContent);
	    console.log("nameBook.childNodes", nameBook.childNodes);
	    BookEvents.removeCountBook();
	 }
});
	
