const myLibrary = [];
const books = document.getElementById("books");
const newBookBtn = document.getElementById("new-book-btn");
const dialog = document.getElementById("new-book-dialog");
const addBookBtn = document.querySelector("#new-book-dialog form > button");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(book) {
    let index = myLibrary.findIndex(b => b.title === book.title);
    myLibrary.splice(index, 1);
    display();
}

function toggleRead(book, card) {
    if (book.read === "read") {
        card.classList.remove("read");
        card.classList.add("not-read");
        book.read = "not read";
        read.innerText = "not read";
    } else if (book.read === "not read") {
        card.classList.remove("not-read");
        card.classList.add("read");
        book.read = "read";
        read.innerText = "read";
    }
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
        const removeBtn = document.createElement("button");
        const statusBtn = document.createElement("button");

        title.innerText = book.title;
        author.innerText = `by ${book.author}`;
        pages.innerText = `${book.pages} Pages`;
        read.innerText = book.read;
        removeBtn.innerText = "Remove";
        removeBtn.setAttribute("type", "button");
        statusBtn.innerText = "Change Read Status";
        statusBtn.setAttribute("type", "button");

        removeBtn.addEventListener("click", () => removeBook(book));
        statusBtn.addEventListener("click", (event) => toggleRead(book, container));

        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(pages);
        container.appendChild(read);
        container.appendChild(removeBtn);
        container.appendChild(statusBtn);
        container.classList.add("book-card");
        
        if (book.read === "read")
            container.classList.add("read");
        else if (book.read === "not read")
            container.classList.add("not-read");

        books.appendChild(container);
    });
}

newBookBtn.addEventListener("click", () => dialog.showModal());

dialog.addEventListener("click", event => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});

addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const form = document.forms["new-book-form"];
    const fd = new FormData(form);

    const title = fd.get("title");
    const author = fd.get("author");
    const pages = fd.get("pages");
    const read = (fd.get("read") === "on")? "read" : "not read";

    addBookToLibrary(title, author, pages, read);
    display();

    dialog.close();
});

display();
