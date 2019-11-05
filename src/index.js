document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3837 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // set up variable names for DOM elements that might be useful
  const imageImg = document.getElementById("image")
  const imageName = document.getElementById("name")
  const imageLikes = document.getElementById("likes")
  const imageLikeButton = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const commentUl = document.getElementById("comments")


  fetch(imageURL)
    .then(response => response.json())
    .then(function(imageObj){
      // take the returned object and display it to the dom
      imageImg.src = imageObj.url 
      imageImg.dataset.id = imageObj.id
      imageName.innerHTML = imageObj.name
      imageLikes.innerHTML = imageObj.like_count
      // iterate over comments array
      // debugger
      imageObj.comments.forEach(comment=>displayComment(comment))

    })

  imageLikeButton.addEventListener("click", addLikes)
  commentForm.addEventListener("submit", addComment)


  function displayComment(commentObj){
    const commentLi = document.createElement("li")
    commentLi.innerHTML = commentObj.content
    const commentDeleteButton = document.createElement("button")
    commentDeleteButton.innerText = "Delete Comment"
    commentDeleteButton.dataset.id = commentObj.id
    commentDeleteButton.addEventListener("click",deleteComment)
    commentLi.append(commentDeleteButton)
    commentUl.append(commentLi)
    // debugger

  }

  function deleteComment(event){
    // find comment id from button dataset, stored as string
    const currentCommentId = event.target.dataset.id
    const currentCommentLi = event.target.parentElement
    // debugger
    // fetch with delete method , routed to comments/:id
    let configObj = {
      method:"DELETE"
    }
    fetch(commentsURL+currentCommentId, configObj)
      .then(response=>response.json())
      .then(function(results){
        
        // debugger
        // check to make sure results["message"] = 'Comment Successfully Destroyed'
        // if successful, remove the comment li element
        if(results["message"] == 'Comment Successfully Destroyed'){
         currentCommentLi.remove()
        }
          
      })
  }

  function addLikes(event){
    // find the current likes from the text in the imageLikes span
    let currentLikes = parseInt(imageLikes.innerText)
    // replace the text with a number one higher
    imageLikes.innerText = currentLikes+1
    // build a config object for our post to the likes api
    let configObj = {
      method:"POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        image_id: imageId
      })
      
    }
    // send a fetch request with method:"post"
    fetch('https://randopic.herokuapp.com/likes',configObj)
      .then(response=>response.json())
      .then(function(returnedObj){
        // debugger
        // optimistic rendering so no work here
      })
    // debugger

  }

  function addComment(event){
    // prevent default to stop page refresh
    event.preventDefault()

    // build new comment with user data from form and known imageId
    const commentInput = document.getElementById("comment_input")
    const newContent = commentInput.value 
    const newComment = {
      image_id: imageId,
      content: newContent
    }
    // reset the form once we have the data from it
    // with optimistic render, showComment was called here
    commentForm.reset()

    // build configObj for post to comments api
    const configObj = {
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newComment)
    }
    
    // send fetch with method:"POST" to commentsURL with new comment as the body
    fetch(commentsURL, configObj)
    .then(response=>response.json())
    .then(function(commentObj){
      
      // moved rendering here for complete object info and pessimistic render
      // displayComment has a comment object as its param
      displayComment(commentObj)
        // debugger
      })

  }


})
