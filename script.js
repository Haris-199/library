const myLibrary = [];
const books = document.getElementById("books");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

myLibrary.push(new Book("1984", "George Orwell", 449, "not read"));
myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 73, "read"));
myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", 340, "not read"));

function addBookToLibrary() {
    const book = new Book();
    myLibrary.push(book);
}

function display() {
    while (books.firstChild)
        books.removeChild(books.firstChild);

    myLibrary.forEach( book => {
        const container = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("h3");
        const pages = document.createElement("p");
        const read = document.createElement("p");

        title.innerText = book.title;
        author.innerText = `by ${book.author}`;
        pages.innerText = `${book.pages} Pages`;
        read.innerText = book.read;

        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(pages);
        container.appendChild(read);
        container.classList.add("book-card");
        
        if (book.read === "read")
            container.classList.add("read");
        else if (book.read === "not read")
            container.classList.add("not-read");

        books.appendChild(container);
    });
}

display();