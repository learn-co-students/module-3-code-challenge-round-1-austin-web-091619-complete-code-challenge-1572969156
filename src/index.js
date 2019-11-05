document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3836 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById("image_card")
  const likeBtn = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const imageLink = document.getElementById("image")
  const imageName = document.getElementById("name")
  const imageLikes = document.getElementById("likes")
  const imageComments = document.getElementById("comments")
  const commentInput = document.getElementById("comment_input")


  fetchInfo()


  function fetchInfo(){
    fetch(imageURL)
    .then(r => r.json())
    .then(renderImage)
  }


  function createComment(e){
    commentInput.innerText = ""
    let newComment = document.createElement("li")
    newComment.dataset.id = e.id
    newComment.dataset.imageId = e.image_id
    newComment.innerText = e.content
    imageComments.append(newComment)
  }

  commentForm.addEventListener("submit",(e) => {
    e.preventDefault()
    let comments = document.createElement("li")
    comments.innerText = input.value
    imageComments.append(comments)

    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({image_id: imageId, content:input.value})
    })
    .then(r => r.json())
  

  function renderImage(imageObj){
    imageLink.src = imageObj.url
    imageName.innerText = imageObj.name
    imageLikes.innerText = imageObj.like_count
    imageComments = imageObj.comments.forEach(createComment)
    likeBtn.addEventListener("click", (e) => {
      let likes_counter = parseInt(imageLikes.innerText)
      imageLikes.innerText = likes_counter++
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({image_id: imageId})
     })
     .then(r => r.json())
    })
  }
})


})
