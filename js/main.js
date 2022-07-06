taskList = [];

function findById(id) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) return i;
  }
  return -1;
}

function handleAdd() {
  var inputTask = document.getElementById("newTask").value;
  if (validateInput(inputTask)) {
    var newTask = new Task(inputTask, "todo");
    taskList.push(newTask);
    saveLocal("tasks", taskList);
    renderTaskList(taskList);
    document.getElementById("newTask").value = "";
    document.getElementById("checkRequire").style.display = "none";
  }
}

function renderTaskList(data) {
  var resultTodo = "";
  var resultCompleted = "";

  for (var i = 0; i < data.length; i++) {
    if (data[i].status === "todo") {
      resultTodo += `<li id='todoItem' ondblclick='handleUpdate(${data[i].id})'>
            ${data[i].taskName}
                <div> 
                    <button id='btnTodoDelete' onclick='handleDelete(${data[i].id})'><i class="fa-solid fa-trash-can"></i></button>
                    <button id='btnTodoStat' onclick='handleToggleStat(${data[i].id})'><i class="fa-solid fa-circle-check"></i></button>
                </div>
            </li>`;
    } else {
      resultCompleted += `<li id='todoCompleted' ondblclick='handleUpdate(${data[i].id})'>
            ${data[i].taskName}
                <div> 
                    <button id='btnCompletedDelete' onclick='handleDelete(${data[i].id})'><i class="fa-solid fa-trash-can"></i></button>
                    <button id='btnCompletedStat' onclick='handleToggleStat(${data[i].id})'><i class="fa-solid fa-circle-check"></i></button>
                </div>
            </li>`;
    }
  }
  document.getElementById("todo").innerHTML = resultTodo;
  document.getElementById("completed").innerHTML = resultCompleted;
}

function handleDelete(id) {
  var index = findById(id);

  if (index === -1) {
    alert("ID invalid!!!");
  } else {
    taskList.splice(index, 1);
    saveLocal("tasks", taskList);
    renderTaskList(taskList);
  }
}

function handleToggleStat(id) {
  var index = findById(id);
  if (index === -1) {
    alert("ID invalid!!!");
  } else {
    if (taskList[index].status === "todo") taskList[index].status = "completed";
    else taskList[index].status = "todo";
    saveLocal("tasks", taskList);
    renderTaskList(taskList);
  }
}

var updateId = 0;
function handleUpdate(id) {
  // console.log(id)
  var index = findById(id);
  if (index === -1) {
    alert("ID invalid!!!");
  } else {
    document.getElementById("newTask").value = taskList[index].taskName;
    document.getElementById("addItem").style.display = "none";
    document.getElementById("updateItem").style.display = "block";
    updateId = taskList[index].id;
  }
}

function handleUpdateBtn() {
  var index = findById(updateId);
  if (index === -1) {
    updateId = 0;
    alert("ID invalid!!!");
  } else {
    var updateValue = document.getElementById("newTask").value;
    if (validateInput(updateValue)) {
      taskList[index].taskName = updateValue;
      saveLocal("tasks", taskList);
      renderTaskList(taskList);
      document.getElementById("newTask").value = "";
      document.getElementById("addItem").style.display = "block";
      document.getElementById("updateItem").style.display = "none";
      document.getElementById("checkRequire").style.display = "none";
      updateId = 0;
    }
  }
}

//Validation input

function validateInput(data) {
  var isValid = true;
  isValid &= checkRequired(data);
  isValid &= checkSameTask(data);
  return isValid;
}

function checkRequired(input) {
  if (input.length > 0) return true;
  document.getElementById("checkRequire").style.display = "block";
  document.getElementById("checkRequire").innerHTML = "* Require";
  return false;
}

function checkSameTask(input) {
  for (var i = 0; i < taskList.length; i++) {
    if (taskList[i].taskName.toLowerCase() === input.toLowerCase()) {
      document.getElementById("checkRequire").style.display = "block";
      document.getElementById("checkRequire").innerHTML = "* Duplicated task";
      return false;
    }
  }
  return true;
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocal(key) {
  var localData = localStorage.getItem(key);
  if (localData === null) return;
  localData = JSON.parse(localData);
  taskList = localData;
  renderTaskList(taskList);
}

getLocal("tasks");
