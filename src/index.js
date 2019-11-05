let IMAGE_ID = 3842
const IMAGE_URL = `https://randopic.herokuapp.com/images/${IMAGE_ID}`
const LIKE_URL = `https://randopic.herokuapp.com/likes/`
const COMMENT_URL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', main)

function main() {
  fetchImage()
  addEventListeners()
}

function fetchImage() {
  fetch(IMAGE_URL)
  .then(response => response.json())
  .then(image => renderImage(image))
}

function renderImage(image) {
  let image_card = document.querySelector("#image_card")
    image_card.querySelector("#image").src = image.url
    image_card.querySelector("#name").innerText = image.name
    image_card.querySelector("#likes").innerText = image.like_count

    let commentBox = image_card.querySelector("#comments")
    for (comment of image.comments) {
      let li = document.createElement("li")
      li.innerText = comment.content
      commentBox.appendChild(li)
    }
}

function addEventListeners() {
  document.querySelector("#like_button").addEventListener("click", addLike)
  document.querySelector("#comment_form").addEventListener("submit", addComment)
}

function addLike(e) {
  const configObj = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "image_id": IMAGE_ID
    })
  }
  fetch(COMMENT_URL, configObj)
  .then(response => response.json())
  .then(function() {
    // Front End Update
    let likes = e.target.parentElement.querySelector("#likes")
    likes.innerText = parseInt(likes.innerText, 10) + 1
  })
}

function addComment(e) {
  e.preventDefault()

  let comment = document.createElement("li")
  comment.innerText = e.target.querySelector("#comment_input").value

  const configObj = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "image_id": IMAGE_ID,
      "content": comment.innerText
    })
  }
  fetch(COMMENT_URL, configObj)
  .then(response => response.json())
  .then(function() {
    // Front End Update
    document.querySelector("#comments").appendChild(comment)
  })
}