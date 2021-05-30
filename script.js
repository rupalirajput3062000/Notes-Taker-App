console.log("Script is Linked Successfully");

let addBtn = document.querySelector(".addNotes");
let noteText = document.querySelector("#noteText");
let noteTitle = document.querySelector("#noteTitle");
let searchText = document.querySelector("#searchText");
console.log();
// Function to show the notes
const showNotes = () => {
  let notesDisplay = document.querySelector(".notes");
  let html = "";
  let notes = localStorage.getItem("notes");
  let str = searchText.value.toLowerCase();
  notesObj = JSON.parse(notes || "[]");
  if (notesObj.length != 0) {
    notesObj.forEach((el, idx) => {
      if (
        str.length == 0 ||
        el.message.toLowerCase().includes(str) ||
        el.title.toLowerCase().includes(str)
      ) {
        html += `<div class="card m-4 notes" style="width: 20rem">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text"> ${el.message}</p>
          <button onclick="deleteNotes(${idx})" class="btn btn-outline-danger">Delete Note</button>
        </div>
      </div>
        `;
      }
    });
    notesDisplay.innerHTML = html;
  } else {
    notesDisplay.innerHTML = "Nothing to Display";
  }
};

// delete The note
const deleteNotes = (idx) => {
  let notesStr = localStorage.getItem("notes");
  notesObj = JSON.parse(notesStr || "[]");
  notesObj.splice(idx, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
};

showNotes();
// Add event Listener on Button
addBtn.addEventListener("click", () => {
  if (noteText.value === "" || noteTitle.value === "") {
    alert("Pleae enter the values");
    return;
  }
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes || "[]");
  const objStr = {
    title: noteTitle.value,
    message: noteText.value,
  };
  notesObj.push(objStr);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  noteText.value = "";
  noteTitle.value = "";
  showNotes();
});

// // Search Functionality
searchText.addEventListener("input", () => {
  showNotes();
});
