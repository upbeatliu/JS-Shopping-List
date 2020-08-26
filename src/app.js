// get form, inputItem, ulList, filter, clearBtn elements
const inputName = document.querySelector("#name");
const title = document.querySelector(".title");
const date = document.querySelector(".date");
const shop = document.querySelector("#shop");
const list = document.querySelector("ul.collection");
const inputItem = document.querySelector("#item");
const clearBtn = document.querySelector(".clear-items");
const form = document.querySelector("#list-form");

//call all event listener
allEventsListener();

function allEventsListener() {
  // Clear Items
  clearBtn.addEventListener("click", clearItems);
  // Check Item
  list.addEventListener("click", checkItem);
  // Remove Item
  list.addEventListener("click", removeItem);
  // Add Item
  form.addEventListener("submit", addItem);
  // Present List name and current date
  inputName.addEventListener("keydown", titleDate);
  // Materialize menu - click to toggle
  document.addEventListener("DOMContentLoaded", menuToggle);
}
//
function clearItems() {
  // clear all li
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}
// Check Item
function checkItem(e) {
  // console.log(e.target);
  if (e.target.parentElement.classList.contains("done-item")) {
    e.target.parentElement.parentElement.style.textDecoration = "line-through";
  }
}

// Remove item
function removeItem(e) {
  // console.log(e.target);
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

// Add item function
function addItem(e) {
  //if inputItem empty alert
  if (inputItem.value === "") {
    M.toast({
      html: "Please add an item.",
      classes: "rounded",
      displayLength: 3000,
    });
  }
  const item = `${inputItem.value} - ${shop.value}`;
  //create li and add class
  const li = document.createElement("li");
  li.className = "collection-item";
  //create text node and append to li
  li.append(document.createTextNode(item));
  //create links and add class
  const deleteLink = document.createElement("a");
  deleteLink.className = "delete-item secondary-content";
  const doneLink = document.createElement("a");
  doneLink.className = "done-item secondary-content";
  //create icon under link
  deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
  doneLink.innerHTML = '<i class="fa fa-check"></i>';
  //Append link to li
  li.appendChild(deleteLink);
  li.appendChild(doneLink);
  //Append li under ul
  list.appendChild(li);
  //store item into LocalStorage

  //clear input text field
  inputItem.value = "";
  e.preventDefault();
}

// Present List name and current date
function titleDate(e) {
  title.innerText = e.target.value;
  let current = new Date();
  let dd = String(current.getDate()).padStart(2, "0");
  let mm = String(current.getMonth() + 1).padStart(2, "0");
  let yyyy = String(current.getFullYear());
  current = `${dd} / ${mm} / ${yyyy}`;
  if (current) {
    date.innerText = current;
  }
}

// menu click to toggle
function menuToggle() {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    direction: "left",
    hoverEnabled: false,
  });
}

// About popup dialogue
(function ($) {
  $(function () {
    //initialize all modals
    $(".modal").modal();
    $(".trigger-modal").modal();
  });
})(jQuery);
