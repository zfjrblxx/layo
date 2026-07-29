const bookContainer = document.getElementById("bookContainer");
const addBook = document.getElementById("addBook");

let books = JSON.parse(localStorage.getItem("layoutBooks")) || [];

render();

addBook.onclick = () => {

    const name = prompt("Nama buku?");

    if (!name) return;

    books.push({
        name,
        classes: []
    });

    save();

};

function render() {

    bookContainer.innerHTML = "";

    updateStats();

    books.forEach((book, bookIndex) => {

        const done = book.classes.filter(c => c.status === "SELESAI").length;

        const total = book.classes.length;

        const percent = total ? done / total * 100 : 0;

        const card = document.createElement("div");

        card.className = "book";

        card.innerHTML = `

        <div class="book-header">

            <h2>${book.name}</h2>

            <button onclick="deleteBook(${bookIndex})">✕</button>

        </div>

        <div class="progress">

            <span style="width:${percent}%"></span>

        </div>

        ${book.classes.map((item,i)=>`

        <div class="class-item">

            <span>Kelas ${item.class}</span>

            <select onchange="changeStatus(${bookIndex},${i},this.value)">

                ${option(item.status)}

            </select>

        </div>

        `).join("")}

        <button class="addClass" onclick="addClass(${bookIndex})">

            + Tambah Kelas

        </button>

        `;

        bookContainer.appendChild(card);

    });

}

function option(selected){

const list=[
"NONE",
"IN",
"LAYOUT",
"EDITOR",
"EDIT",
"SOP",
"KIRIM",
"SELESAI",
"KJ"
];

return list.map(x=>

`<option ${selected===x?"selected":""}>${x}</option>`

).join("");

}

function addClass(index){

const kelas=prompt("Nomor kelas");

if(!kelas)return;

books[index].classes.push({

class:kelas,

status:"NONE"

});

save();

}

function deleteBook(index){

if(confirm("Hapus buku?")){

books.splice(index,1);

save();

}

}

function changeStatus(book,classIndex,status){

books[book].classes[classIndex].status=status;

save();

}

function save(){

localStorage.setItem(

"layoutBooks",

JSON.stringify(books)

);

render();

}

