var newTask = [];

const addTask = () => {
  const task = document.getElementById("task").value;
  const date = (document.getElementById("date").value =
    new Date().toLocaleDateString());
  const time = document.getElementById("time").value;

  clearText();

  const newNote = new Object();

  newNote.task = task;
  newNote.date = date;
  newNote.time = time;

  newTask.push(newNote);
  makeNewNote();

  localStorage.setItem("tasks", JSON.stringify(newTask));
  let taskStorage = JSON.parse(localStorage.getItem("tasks"));
  console.log(taskStorage);
};
document.addEventListener("DOMContentLoaded", function (event) {
  let storedTasks = JSON.parse(localStorage.getItem("tasks")); // retrieve the stored tasks from the local storage
  if (storedTasks) {
    newTask = storedTasks;
    makeNewNote(); // call makeNewNote to display the stored tasks
  }
});

const clearText = () => {
  document.getElementById("task").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
};

const makeNewNote = () => {
  var noteData = document.getElementById("notes");
  var data = "";

  newTask.forEach((item, index) => {
    let ind = index;
    data += `<div id = "newNote-${ind}"> <br>
        <button id = "deleteNote" onclick='remove(${ind})' > ✖ </button>

        <div id = noteTask>
       <textarea readonly> ${item.task}</textarea>
        </div>
       
        <div id = timeInfo>
        ${item.date} </br>
        ${item.time}
        
       </div>
        </div>
        `;
  });

  noteData.innerHTML = data;
};
function remove(ind) {
  var confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );
  if (confirmDelete) {
    var element = document.getElementById(`newNote-${ind}`);
    element.remove();

    newTask.splice(ind, 1);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    console.log(newTask);
  }
}
