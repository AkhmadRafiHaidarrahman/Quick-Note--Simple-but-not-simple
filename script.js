let btnNote = document.querySelector("#AddNote")
let title = document.querySelector(".Title")
title.classList.add("hidden")
let Content = document.querySelector(".Content")
Content.classList.add("hidden")

let Btn = document.getElementsByClassName("CloseBtn")[0]

let form = document.querySelector(".form")
form.classList.toggle("form")

let NoteS = document.querySelector(".NoteS")
NoteS.classList.remove("NoteS")

document.addEventListener("DOMContentLoaded",function(){
    btnNote.addEventListener("click",function(){
        NoteS.classList.toggle("NoteS")
        title.classList.toggle("hidden")
        Content.classList.toggle("hidden")
        form.classList.toggle("form")
    })
})

document.addEventListener("DOMContentLoaded",function(){
    Btn.addEventListener("click",function(){
    NoteS.classList.toggle("NoteS")
    title.classList.toggle("hidden")
    Content.classList.toggle("hidden")
    form.classList.toggle("form")
    })
})


let CancelBtn = document.querySelector(".CancelBtn")
let SubmitBtn = document.querySelector(".SubmitBtn")

CancelBtn.addEventListener("click",function(e){
    e.preventDefault()
    NoteS.classList.toggle("NoteS")
    title.classList.toggle("hidden")
    Content.classList.toggle("hidden")
    form.classList.toggle("form")
})

let text = document.querySelector("#text")
let Tcontent = document.querySelector("#content")
let ContainerNote = document.querySelector("#ContainerNote")


function simpan(title, content) {
    let allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    allNotes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(allNotes));
}

function loadNotes() {
    let allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    allNotes.forEach(note => {
        createNoteElement(note.title, note.content);
    });
}

function createNoteElement(titleText, contentText) {
    let ul = document.createElement("ul");
    ul.classList.add("ul");

    let div = document.createElement("div");
    div.classList.add("judul");

    let li = document.createElement("li");
    li.classList.add("li");
    li.textContent = titleText;

    let edit = document.createElement("button");
    edit.textContent = "✏️";
    edit.classList.add("edited");

    let x = document.createElement("button");
    x.textContent = "X";
    x.classList.add("closebtn");

    let p = document.createElement("p");
    p.textContent = contentText;

    div.appendChild(li);
    div.appendChild(edit);
    div.appendChild(x);
    ul.appendChild(div);
    ul.appendChild(p);

    ContainerNote.appendChild(ul);
}

SubmitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let titleText = text.value.trim();
    let contentText = Tcontent.value.trim();

    if (titleText && contentText) {
        simpan(titleText, contentText);
        createNoteElement(titleText, contentText);
    }

    NoteS.classList.toggle("NoteS");
    title.classList.toggle("hidden");
    Content.classList.toggle("hidden");
    form.classList.toggle("form");
    text.value = "";
    Tcontent.value = "";
});

document.addEventListener("DOMContentLoaded", loadNotes);

ContainerNote.addEventListener("click",function(e){
    if(e.target.classList.contains("closebtn")){
        const parentUl = e.target.closest("ul")
        if(parentUl){
            ContainerNote.removeChild(parentUl)
        }
    }
})

ContainerNote.addEventListener("click", function(e) {
    if (e.target.classList.contains("edited")) {
        const titleEl = e.target.closest(".judul").querySelector(".li");
        if (titleEl) {
            const currentText = titleEl.textContent;
            const input = document.createElement("input");
            input.value = currentText;
            input.classList.add("li"); // keep styling if needed
            titleEl.replaceWith(input);
            // Optional: save on Enter
            input.addEventListener("keydown", function(ev) {
                if (ev.key === "Enter") {
                    const newLi = document.createElement("li");
                    newLi.classList.add("li");
                    newLi.textContent = input.value;
                    input.replaceWith(newLi);
                }
            });
        }
    }
});
