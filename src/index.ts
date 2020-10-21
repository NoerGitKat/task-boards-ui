const addBtns = Array.from(document.querySelectorAll(".add-btn:not(.solid)"));
const saveItemBtns = Array.from(document.querySelectorAll(".solid"));
const addItemContainers = Array.from(
  document.querySelectorAll(".add-container")
);
const addItems = Array.from(document.querySelectorAll(".add-item"));

// Item Lists
const itemLists = Array.from(document.querySelectorAll(".drag-item-list"));
const backlogList: HTMLElement | null = document.getElementById("backlog-list");
const progressList: HTMLElement | null = document.getElementById(
  "progress-list"
);
const completeList: HTMLElement | null = document.getElementById(
  "complete-list"
);
const onHoldList: HTMLElement | null = document.getElementById("on-hold-list");

// Items

// Initialize Arrays
let backlogListArray: string[] = [];
let progressListArray: string[] = [];
let completeListArray: string[] = [];
let onHoldListArray: string[] = [];

// Drag Functionality

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns(): void {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns(): void {
  localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
  localStorage.setItem("progressItems", JSON.stringify(progressListArray));
  localStorage.setItem("completeItems", JSON.stringify(completeListArray));
  localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  console.log("columnEl:", columnEl);
  console.log("column:", column);
  console.log("item:", item);
  console.log("index:", index);
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  // Backlog Column
  // Progress Column
  // Complete Column
  // On Hold Column
  // Run getSavedColumns only once, Update Local Storage
}
