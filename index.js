let todoList = [];

let currentChange;
let flag = true;

function init() {
  if (flag) {
    document.getElementById("blur-2").style.display = "none";
    document.getElementById("blur").style.display = "block";
  } else {
    document.getElementById("blur").style.display = "none";
    document.getElementById("blur-2").style.display = "block";
  }
  if (todoList.length === 0) {
    console.log(document.getElementById("no"));
    console.log(todoList);
    document.getElementById("no").style.display = "block";
  } else {
    console.log("inside");
    document.getElementById("no").style.display = "none";
  }
}

init();

function renderTodo(todo) {
  init();
  const list = document.querySelector(".flex-row-list");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < todoList.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", todoList[i].id);
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${todoList[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="deleteTodo(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'btn-add' onclick="changeAddItem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(node.childNodes);
    list.append(node);
    let currentTodo = todoList[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}

function markCompleted(element) {
  let classToPut = flag
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");

  // Find in the todo array
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      for (let j = 0; j < todoList[i].subTask.length; j++) {
        if (todoList[i].subTask[j].id == subTaskId) {
          todoList[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}

function addTodo() {
  let heading = document.getElementById("listHeading").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    todoList.push(todo);
    change();
    goBack();
  }
}

function addSubTodo() {
  let taskHeading = document.getElementById("subListHeading").value;
  if (taskHeading !== "") {
    let list;
    if (flag) {
      list = currentChange.parentNode.parentNode.childNodes[2];
    } else {
      list = currentChange.parentNode.parentNode.childNodes[3];
    }
    console.log(currentChange.parentNode, currentChange.parentNode.parentNode);
    let id = currentChange.parentNode.parentNode.getAttribute("data-key");
    console.log(currentChange.parentNode.parentNode);

    const node = document.createElement("li");
    node.setAttribute("class", flag ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

    let currentTodo;
   
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }

    list.append(node);
   changeAddItem();
  }
  console.log(todoList);
}

function deleteTodo(element) {
  let tempElement = element.parentNode.parentNode;
  console.log(tempElement);

 
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == tempElement.getAttribute("data-key")) {
      todoList.splice(i, 1);
    }
  }
  if (!flag) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    init();
  }
}

function change() {
  var blur;
  if (flag) {
    blur = document.getElementById("blur");
  } else {
    blur = document.getElementById("blur-2");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("pop");
  popup.classList.toggle("active");
}

function changeAddItem(item) {
  currentChange = item;
  var blur;
  if (flag) {
    blur = document.getElementById("blur");
  } else {
    blur = document.getElementById("blur-2");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("popAddItem");
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      currentTodo = todoList[i];
    }
  }
  flag = false;
  init();
  document.getElementById("currentHeading").textContent = currentTodo.heading;
  document.getElementById("currentHeading-1").textContent = currentTodo.heading;
  document
    .getElementById("currentHeading-1")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}
function goBack() {
  flag = true;
  renderTodo();
}
