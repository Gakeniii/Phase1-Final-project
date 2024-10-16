
const baseURL = "https://my-json-server.typicode.com/Gakeniii/Phase1-Final-project/gifts";

//tried to deploy the db.json file to github
// const baseURL = "https://gakeniii.github.io/API/db.json";

document.addEventListener("DOMContentLoaded", function () {
  fetch(baseURL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Sorry. There was a problem retrieving gifts.");
      }
      return resp.json();
    })
    .then((data) => {
      nameList(data);
    })
    .catch((err) => {
      alert("An error occurred: " + err);
    });
    // Initializing the server
    submitData();
});

function nameList(giftArray) {
  giftArray.forEach((giftObject) => {
    renderGift(giftObject); // Reuse renderGift to handle list creation
  });
}

function renderGift(giftObject) {
  let nameItem = document.createElement("li");
  nameItem.textContent = giftObject.name;
  let orderedNames = document.querySelector("#giftGetters");
  orderedNames.append(nameItem);

  nameItem.addEventListener("click", () => {
    // Destructure giftObject
    const { id, name, item, price, picture, link, comment } = giftObject;

    // Select elements
    const delGift = document.getElementById("delete");
    const itemGift = document.querySelector("#itemGift");
    const nameGift = document.querySelector("#nameGift");
    const priceGift = document.querySelector("#priceGift");
    const pictureGift = document.querySelector("#mainGift");
    const linkGift = document.querySelector("#linkGift");
    const commentGift = document.querySelector("#commentGift");
    
    //Removing the link scrolling to the from
    //didn't work was stalling the whole page
    // document.getElementById('wish').remove()

    //ADDING THE DELETE BUTTON
    // Clear previous delete button
    delGift.innerHTML = "";

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      deleteGift(id); // Call the delete function
      nameItem.remove(); // Removes the gift from the list
      e.target.reset() 
    });
    delGift.appendChild(deleteBtn);

    // Update UI with gift details
    itemGift.innerText = item;
    nameGift.textContent = name;
    priceGift.textContent = price;
    pictureGift.src = picture;
    linkGift.href = link;
    commentGift.textContent = comment;
  });
}

//Adding a gift to the form
function submitData() {
  // Grab the form
  const addAnotherGift = document.getElementById("submitForm");

  // Add event listener
  addAnotherGift.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect form input values
    const newName = event.target["nameInput"].value;
    const newItem = event.target["itemInput"].value;
    const newPrice = event.target["priceInput"].value;
    const newPicture = event.target["pictureInput"].value;
    const newLink = event.target["linkInput"].value;
    const newComment = event.target["commentInput"].value;

    const newGift = {
      item: newItem,
      name: newName,
      price: newPrice,
      picture: newPicture,
      link: newLink,
      comment: newComment,
    };

    renderGift(newGift); // Display the new gift

    // POST request to server
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGift),
    })
      .then((res) => res.json())
      .then((giftObj) => {
        alert('Item added successfully ;)')
        console.log(giftObj)
      })
      .catch((error) => console.error(error));

    event.target.reset(); // Clear form inputs
  });
}

//Editing a gift didn't work
// function updateData(id) {
//     //grab the form
//     const addAnotherGift = document.getElementById("submitForm")
//     // get the event listener too
//     const editGift = document.createElement('Edit')
//     addAnotherGift.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const newName = event.target["nameInput"].value
//         const newItem = event.target["itemInput"].value
//         const newPrice = event.target["priceInput"].value
//         const newPicture = event.target["pictureInput"].value
//         const newLink = event.target["linkInput"].value
//         const newComment = event.target["commentInput"].value

//         const updateGift = {
//             item: newItem,
//             name: newName,
//             price: newPrice,
//             picture: newPicture,
//             link: newLink,
//             comment: newComment
//         }

//         const edit = document.getElementById('edit');
//         edit.appendChild(editGift)
//         renderGift(updateGift);

//         fetch(`${baseURL}/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(updateGift),
//         })
//             .then((res) => res.json())
//             .then((giftObj) => console.log(giftObj))
//             .catch(error => console.error(error))
//         event.target.reset()
//     })
// }

//Deleting a gift
function deleteGift(id) {
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      alert("Item deleted successfully!");
    })
    .catch((error) => console.log("Error: Cannot delete:", error));
}

