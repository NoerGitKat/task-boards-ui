"use strict";
const addBtns = Array.from(document.querySelectorAll(".add-btn:not(.solid)"));
const saveItemBtns = Array.from(document.querySelectorAll(".solid"));
const addItemContainers = Array.from(document.querySelectorAll(".add-container"));
const addItems = Array.from(document.querySelectorAll(".add-item"));
// Item Lists
const listColumns = Array.from(document.querySelectorAll(".drag-item-list"));
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");
// Items
let updatedOnLoad = false;
// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let boards = [];
let lists = [];
// Drag Functionality
let draggedItem;
let currentColumn;
// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem("backlogItems")) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    }
    else {
        backlogListArray = ["Release the course", "Sit back and relax"];
        progressListArray = ["Work on projects", "Listen to music"];
        completeListArray = ["Being cool", "Getting stuff done"];
        onHoldListArray = ["Being uncool"];
    }
}
getSavedColumns();
updateSavedColumns();
// Set localStorage Arrays
function updateSavedColumns() {
    boards = [
        backlogListArray,
        progressListArray,
        completeListArray,
        onHoldListArray,
    ];
    const boardNames = ["backlog", "progress", "complete", "onHold"];
    boards.map((board, index) => localStorage.setItem(`${boardNames[index]}Items`, JSON.stringify(board)));
}
// Create DOM Elements for each list item
function createItemEl(columnEl, column, task, index) {
    // List Item
    const listEl = document.createElement("li");
    listEl.classList.add("drag-item");
    listEl.textContent = task;
    listEl.draggable = true;
    listEl.setAttribute("ondragstart", "drag(event)");
    columnEl === null || columnEl === void 0 ? void 0 : columnEl.append(listEl);
}
function drag(event) {
    draggedItem = event.target;
}
function dragEnter(column) {
    listColumns[column].classList.add("over");
    currentColumn = column;
}
function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    // Remove bg/padding
    listColumns.map((column) => column.classList.remove("over"));
    // Add Item to column
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
    updateLists();
}
// Update lists
function updateLists() {
    // boards = [
    //   backlogListArray,
    //   progressListArray,
    //   completeListArray,
    //   onHoldListArray,
    // ];
    // const newBoards = boards.map((board, index) => {
    //   board = [];
    //   const column = listColumns[index];
    //   if (column) {
    //     let text: string | null;
    //     for (let index = 0; index < column.children.length; index++) {
    //       text = column.children[index].textContent;
    //       if (text) {
    //         board.push(text);
    //       }
    //     }
    //   }
    //   return board;
    // });
    // boards = newBoards;
    backlogListArray = [];
    if (backlogList) {
        let listElText;
        for (let i = 0; i < backlogList.children.length; i++) {
            listElText = backlogList.children[i].textContent;
            if (listElText) {
                backlogListArray.push(listElText);
            }
        }
    }
    progressListArray = [];
    if (progressList) {
        let listElText;
        for (let i = 0; i < progressList.children.length; i++) {
            listElText = progressList.children[i].textContent;
            if (listElText) {
                progressListArray.push(listElText);
            }
        }
    }
    completeListArray = [];
    if (completeList) {
        let listElText;
        for (let i = 0; i < completeList.children.length; i++) {
            listElText = completeList.children[i].textContent;
            if (listElText) {
                completeListArray.push(listElText);
            }
        }
    }
    onHoldListArray = [];
    if (onHoldList) {
        let listElText;
        for (let i = 0; i < onHoldList.children.length; i++) {
            listElText = onHoldList.children[i].textContent;
            if (listElText) {
                onHoldListArray.push(listElText);
            }
        }
    }
    updateDOM();
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
    updatedOnLoad = true;
    updateSavedColumns();
}
updateDOM();
