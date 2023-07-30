
document.getElementById("iits-developer").innerHTML = "Aowsaf Anzum";


let iform = document.getElementById('iits-adminSection');
im.style.display = 'none';



let itemsData = [];

// login
let admin = document.getElementById('iits-adminBtn');
admin.addEventListener('click', function() {
  let userid = prompt("Enter Your Id: ");
  let userpass = prompt("Enter your password: ");
  
  if (userid === 'iits' && userpass === '23') {
    itemform.style.display = 'block';
  } else {
    alert("Wrong Credentials.");
  }
});

let closeButton = document.getElementById('iits-cancelBtn');
closeButton.addEventListener('click', function() {
  itemform.style.display = 'none';
});

// Add new item form
let addNewForm = document.getElementById('iits-addNewForm');
addNewForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let itemName = document.getElementById('name').value;
  let itemPic = document.getElementById('pic');
  let itemDesc = document.getElementById('desc').value;
  let itemType = document.getElementById('typeItem').value;

  
  if (itemType=="invalid") {
    alert("Please select an item type before submission.");
    return; 
  }

  // Create a new item object
  let newItem = {
    name: itemName,
    pic: itemPic,
    desc: itemDesc,
    type: itemType
  };

  itemsData.push(newItem);
  populateItems(itemsData);


  addNewForm.reset();
});

  
// Function to populate items on the webpage
function populateItems(items) {
    let itemsContainer = document.getElementById('iits-items');
  

    itemsContainer.innerHTML = '';
    
    items.forEach(item => {
    
      if (item.name  && item.desc && item.type) {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item col-md-6 col-lg-4 p-3';
        itemDiv.setAttribute('data-category', item.type);
  
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
  
        let imgContainerDiv = document.createElement('div');
        imgContainerDiv.className = 'img-container';
  
        let imgElement = document.createElement('img');
        imgElement.src = item.url;
        imgElement.alt = item.name;
  
        let categorySpan = document.createElement('span');
        categorySpan.className = 'category-pill';
        categorySpan.textContent = item.type;
  
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
  
        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = item.name;
  
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = item.desc;
  
        let addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'addToCartBtn btn w-100';
        addToCartBtn.textContent = 'Add to cart';
  
        imgContainerDiv.appendChild(imgElement);
        imgContainerDiv.appendChild(categorySpan);
        cardDiv.appendChild(imgContainerDiv);
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(addToCartBtn);
        cardDiv.appendChild(cardBodyDiv);
        itemDiv.appendChild(cardDiv);
        itemsContainer.appendChild(itemDiv);
      }
    });
  }
  
async function fetchItemsAndUpdate() {
  try {
    const response = await fetch("https://64b2e33138e74e386d55b072.mockapi.io/api/hanover");
    const data = await response.json();
    
    const validItems = data.filter(item => item.type !== "invalid");
    
    itemsData = validItems;
    
    populateItems(itemsData);
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

window.addEventListener("load", function() {
  fetchItemsAndUpdate();
});


let cartCounter = document.getElementById('iits-cart_counter');
let addToCartButtons = document.getElementsByClassName('addToCartBtn');
let cartDecButton = document.getElementById('cart_dec');

let itemsContainer = document.getElementById('iits-items');

itemsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('addToCartBtn')) {
    let currentCount = parseInt(cartCounter.textContent);
    let newCount = currentCount + 1;
    cartCounter.textContent = newCount;

  
    localStorage.setItem('cartCount', newCount);
  }
});

cartDecButton.addEventListener('click', function() {
  let currentCount = parseInt(cartCounter.textContent);
  if (currentCount > 0) {
    let newCount = currentCount - 1;
    cartCounter.textContent = newCount;

    localStorage.setItem('cartCount', newCount);
  }
});

let storedCartCount = localStorage.getItem('cartCount');
if (storedCartCount) {
  cartCounter.textContent = storedCartCount;
}



function showAllItems() {
  let items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.style.display = 'block';
  });
}
let allToggle = document.getElementById('all_toggle');
let coffeeToggle = document.getElementById('coffee_toggle');
let burgerToggle = document.getElementById('burger_toggle');


allToggle.addEventListener('click', function () {
  showAllItems();
});

coffeeToggle.addEventListener('click', function () {
  filterItems('coffee');
});

burgerToggle.addEventListener('click', function () {
  filterItems('burger');
});



function filterItems(category) {
  let items = document.querySelectorAll('.item');
  items.forEach(item => {
    let itemCategory = item.getAttribute('data-category');
    if (itemCategory === category ) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}



let foodname = document.getElementsByClassName('card-title')
let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('iits-searchBox');
let submitbutton = document.getElementsByClassName("btn")


searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let searchQuery = searchInput.value.toLowerCase().trim();

  if (searchQuery !== '') {
  
    const filteredItems = itemsData.filter(item => {
      return item.name.toLowerCase().includes(searchQuery) ||
             item.desc.toLowerCase().includes(searchQuery) ||
             item.type.toLowerCase().includes(searchQuery);
    });

  
    populateItems(filteredItems);
  } else {

    showAllItems();
  }
});