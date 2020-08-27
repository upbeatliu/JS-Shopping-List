// get form, inputItem, ulList, filter, clearBtn elements
const inputName = document.querySelector("#name");
const empty = document.querySelector(".empty");
const title = document.querySelector(".title");
const date = document.querySelector(".date");
const shop = document.querySelector("#shop");
const list = document.querySelector("ul.collection");
const inputItem = document.querySelector("#item");
const clearBtn = document.querySelector(".clear-items");
const filterInput = document.querySelector("#filter");
const form = document.querySelector("#list-form");

//call all event listener
allEventsListener();

function allEventsListener() {
  // load items from localStorage
  document.addEventListener("DOMContentLoaded", getLoadItems);
  // Filter Items
  filterInput.addEventListener("keyup", filterItems);
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

// Load Items from localStorage
function getLoadItems() {
  let lists, items, shops;
  lists = {
    items: items,
    shops: shops,
  };

  if (
    localStorage.getItem("lists") == null ||
    localStorage.getItem("lists").length == "23"
  ) {
    lists.items = [];
    lists.shops = [];
    // display empty text
    empty.style.display = "block";
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
    // display empty text
    empty.style.display = "none";
  }

  for (var i = 0; i < lists.items.length; i++) {
    const li = document.createElement("li");
    li.className = "collection-item";
    // first letter uppercase from shop
    let shopName = lists.shops[i];

    shopName = shopName.charAt(0).toUpperCase() + shopName.slice(1);
    //create text node and append to li
    li.append(document.createTextNode(`${lists.items[i]} from ${shopName}`));
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
  }
}

// Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  //select all current li and forEach display if they are matched text
  document.querySelectorAll("li.collection-item").forEach(function (item) {
    //identify current item and its firstChild of textcontent to be lowerCase
    const search = item.firstChild.textContent.toLowerCase();
    //if search text from item not equal -1 display, else none
    if (search.indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Clear items button
function clearItems() {
  // clear all li
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // create empty div
  const empty = document.createElement("div");
  empty.className = "card-content empty";
  empty.append(document.createTextNode("Your list is empty!"));
  list.appendChild(empty);
  // clear tasks from localstorage
  localStorage.clear();
}
// Check Item
function checkItem(e) {
  // console.log(e.target);
  if (e.target.parentElement.classList.contains("done-item")) {
    e.target.parentElement.parentElement.style.textDecoration = "line-through";
  }
}

// Remove a item
function removeItem(e) {
  // console.log(e.target);
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }

  //remove from LocalStorage
  let str = e.target.parentElement.parentElement.firstChild.textContent;
  let ItemName = str.substr(0, str.indexOf(" "));

  removeFromLocalStorage(ItemName);
}

function removeFromLocalStorage(pickItem) {
  //check is localStorage null, if set lists equal to them
  let lists, items, shops;
  lists = {
    items: items,
    shops: shops,
  };
  if (localStorage.getItem("lists") == null) {
    lists.items = [];
    lists.shops = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }

  //forEach lists if pickTask is matched the localTask, remove it
  lists.items.forEach(function (localItem, index) {
    if (pickItem === localItem) {
      lists.items.splice(index, 1);
      lists.shops.splice(index, 1);
    }
  });

  if (lists.items.length == 0) {
    // remove empty text
    empty.style.display = "block";
    // localStorage.clear(); // not working
  }

  //store lists back localStorage
  localStorage.setItem("lists", JSON.stringify(lists));
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
  // first letter uppercase from shop
  let shopName = shop.value;
  shopName = shopName.charAt(0).toUpperCase() + shopName.slice(1);

  const item = `${inputItem.value} from ${shopName}`;
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
  storeItemInLocal(inputItem.value, shop.value);
  // remove empty text
  empty.style.display = "none";
  //clear input text field
  inputItem.value = "";
  e.preventDefault();
}

// Store Item in localStorage
function storeItemInLocal(item, shop) {
  let lists, items, shops;

  if (localStorage.getItem("lists") === null) {
    lists = {
      items: items,
      shops: shops,
    };
    lists.items = [];
    lists.shops = [];
  } else {
    lists = JSON.parse(localStorage.getItem("lists"));
  }
  lists.items.push(item);
  lists.shops.push(shop);
  //save back localStorage
  localStorage.setItem("lists", JSON.stringify(lists));
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
