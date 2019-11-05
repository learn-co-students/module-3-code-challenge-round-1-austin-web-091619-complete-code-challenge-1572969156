document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 3838
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const commentForm = document.getElementById("comment_form")
  const likeButton = document.getElementById("like_button")

  commentForm.addEventListener("submit", addComment)
  likeButton.addEventListener("click", addLike)
  
  
  fetchImage().then(addImageInfo)
  
  
  function fetchImage(){
    return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(r => r.json())
  }
  
  function addImageInfo(image){
   
    let spotForImage = document.getElementById("image")
    let imageTitle = document.getElementById("name")
    let imageLikes = document.getElementById("likes")
    
    spotForImage.src = image.url
    imageTitle.innerText = image.name
    imageLikes.innerText = image.like_count
    
    image.comments.forEach(comment => {
      let comments = document.getElementById("comments")
      let li = document.createElement("li")
      let delButton = document.createElement("button")

      li.innerText = comment.content
      delButton.innerText = "Delete"
      delButton.dataset.id = comment.id

      li.append(delButton)

      delButton.addEventListener("click", deleteComment)

      comments.append(li)

    })
  }


  function addLike(event){
    document.getElementById("likes").innerHTML = parseInt(document.getElementById("likes").innerHTML)+1;

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })

  }


  function addComment(event){
    event.preventDefault()
    
    let newComment = document.getElementById("comment_input")
    let commentList = document.getElementById("comments")
    let li = document.createElement("li")
    let delButton = document.createElement("button")
    delButton.innerText = "Delete"
    delButton.style.size = "small"
    delButton.addEventListener("click", deleteComment)

    li.innerText = newComment.value
    li.appendChild(delButton)
    commentList.append(li)
    
    
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: newComment.value })
    })

    newComment.value = ""
  }


  function deleteComment(event){
    let commentToDel = event.target.dataset.id
    let delThisComment = event.target.parentNode
    delThisComment.remove()
    fetch(`https://randopic.herokuapp.com/comments/${commentToDel}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(message => {
      window.alert("Comment deleted successfully.")
  
    })
  }

})



// When a comment is first added it will not delete successfully.
// This is due to the dataset id not existing on the comment or delete button when a new comment is created.