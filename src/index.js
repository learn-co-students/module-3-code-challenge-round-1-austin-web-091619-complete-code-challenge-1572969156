let imageId = 3840 //Enter the id from the fetched image here
let imageData
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


getImage()
})


function getImage(){
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(function(response){ return response.json()})
    .then(function(imageObj){renderImage(imageObj)})

}

function renderImage(imageObj){

  imageData = imageObj
  let image = document.getElementById("image")
  image.src = imageObj.url

  let imageCard = document.getElementById("image_card")
  imageCard.append(image)

  imageObj.comments.forEach(function(comment) {

    let commentLi = document.createElement("li")
    commentLi.innerText = comment.content
    let commentUl = document.getElementById("comments")
    commentUl.append(commentLi)
  })
   let likeCount = document.getElementById("likes")
   likeCount.innerText = imageObj.like_count

   let title = document.getElementById("name")
   title.innerText = imageObj.name

   let likeButton = document.getElementById("like_button")
   likeButton.addEventListener("click", likeClick)

   let commentForm = document.getElementById("comment_form")
   commentForm.addEventListener("submit", formHandler)


}

function likeClick(e){
  e.preventDefault()
  let likeCount = document.getElementById("likes")
  let newLikes = parseInt(likeCount.innerText) + 1
  likeCount.innerText = newLikes

  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({image_id: 3840, like_count: newLikes})
  }


  fetch('https://randopic.herokuapp.com/likes',configObject)

}

function formHandler(e){
  e.preventDefault()

  let commentInput = document.getElementById("comment_input").value

  let commentUl = document.getElementById("comments")
  let commentLi = document.createElement("li")
  commentLi.innerText = commentInput
  commentUl.append(commentLi)


  let configObject = {
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({image_id: 3840, content: commentInput})
  }

  fetch('https://randopic.herokuapp.com/comments', configObject)



}
