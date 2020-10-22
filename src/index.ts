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
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray: string[] = [];
let progressListArray: string[] = [];
let completeListArray: string[] = [];
let onHoldListArray: string[] = [];
let boards: Array<string[]> = [];
let lists: Array<HTMLElement | null> = [];

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

getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns(): void {
  boards = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const boardNames = ["backlog", "progress", "complete", "onHold"];
  boards.map((board, index) =>
    localStorage.setItem(`${boardNames[index]}Items`, JSON.stringify(board))
  );
}

// Create DOM Elements for each list item
function createItemEl(
  columnEl: HTMLElement | null,
  column: number,
  task: string,
  index: number
) {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = task;
  columnEl?.append(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  lists = [backlogList, progressList, completeList, onHoldList];
  boards = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];

  // Update List
  lists.map((list) => {
    if (list) {
      list.textContent = "";
    }
  });

  // Update Board
  boards.map((board, index) => {
    board.map((task) => createItemEl(lists[index], 0, task, index));
  });

  // Run getSavedColumns only once, Update Local Storage
}

updateDOM();
