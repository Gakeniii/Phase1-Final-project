submitData();
const baseURL = "http://localhost:3000/gifts"

document.addEventListener("DOMContentLoaded", function () {
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
            const gift = data
            nameList(gift)
        })
})


function nameList(giftArray) {

    giftArray.forEach(giftObject => {
        let orderedNames = document.getElementById("giftGetters")
        let nameItem = document.createElement('li')
        nameItem.textContent = giftObject.name
        orderedNames.append(nameItem)


        //trying to create a purchase button for each item

        nameItem.addEventListener('click', (e) => {
            const { item, name, price, picture, link, comment } = giftObject

            const itemGift = document.querySelector("#itemGift")
            const nameGift = document.querySelector("#nameGift")
            const priceGift = document.querySelector("#priceGift")
            const pictureGift = document.querySelector("#mainGift")
            const linkGift = document.querySelector("#linkGift")
            const commentGift = document.querySelector("#commentGift")

            itemGift.innerText = giftObject.item
            nameGift.textContent = giftObject.name
            priceGift.textContent = giftObject.price
            pictureGift.src = giftObject.picture
            linkGift.href = giftObject.link
            commentGift.textContent = giftObject.comment

        })

    })
}

function renderGift(giftObject) {
    let nameItem = document.createElement('li')
    nameItem.textContent = giftObject.name
    let orderedNames = document.querySelector('#giftGetters')
    orderedNames.append(nameItem)

    nameItem.addEventListener('click', (e) => {
        //Destructuring 
        const { item, name, price, picture, link, comment } = giftObject

        const itemGift = document.querySelector("#itemGift")
        const nameGift = document.querySelector("#nameGift")
        const priceGift = document.querySelector("#priceGift")
        const pictureGift = document.querySelector("#mainGift")
        const linkGift = document.querySelector("#linkGift")
        const commentGift = document.querySelector("#commentGift")

        itemGift.innerText = giftObject.item
        nameGift.textContent = giftObject.name
        priceGift.textContent = giftObject.price
        pictureGift.src = giftObject.picture
        linkGift.href = giftObject.link
        commentGift.textContent = giftObject.comment

        name.innerHTML = `<button onclick="deleteGift(${giftObject.id})">Delete</button>`
    })

}

function submitData() {
    //grab the form
    const addAnotherGift = document.getElementById("submitForm")
    // get the event listener too 
    addAnotherGift.addEventListener('submit', (event) => {
        event.preventDefault();

        const newName = event.target["nameInput"].value
        const newItem = event.target["itemInput"].value
        const newPrice = event.target["priceInput"].value
        const newPicture = event.target["pictureInput"].value
        const newLink = event.target["linkInput"].value
        const newComment = event.target["commentInput"].value

        const newGift = {
            item: newItem,
            name: newName,
            price: newPrice,
            picture: newPicture,
            link: newLink,
            comment: newComment
        }

        renderGift(newGift);

        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGift),
        })
            .then((res) => res.json())
            .then((giftObj) => console.log(giftObj))
            .catch(error => console.error(error))
        event.target.reset()
    })

}

// function updateData() {
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

//         renderGift(updateGift);

//         fetch(baseURL, {
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

function deleteGift(id){
    fetch(`${baseURL}/${id}`,{
    method: 'DELETE',
    header: {
        "Content-type": "application/json",
    }
    .then(res => res.json())
    .then(() => {
        alert("Item deleted successfully !")
    })
    .catch(error => console.log("Error cannor delete:",error))
    })
}


