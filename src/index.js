document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 3839 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const image = document.querySelector("#image")
  const imgName = document.querySelector("#name")
  const likes = document.querySelector("#likes")
  const likeButton = document.querySelector("#like_button")
  const ulComment = document.querySelector("#comments")
  const liComment = document.createElement("li")

  fetchData()
  createComment()

  function fetchData() {
    fetch(imageURL)
      .then(r => r.json())
       .then(function(obj) {
         imageData(obj)
       })
  }

  function imageData(obj) {
    image.src = obj.url
    likes.innerHTML = obj.like_count
    imgName.innerText = obj.name
    obj.comments.forEach(comment => {
      const showLi = document.createElement("li")
      showLi.dataset.id = comment.id
      showLi.innerHTML = comment.content
      ulComment.append(showLi)
    })
    likeButton.addEventListener('click', addLikes)
  }
  function addLikes(e) {
    let likeCount = parseInt(likes.innerHTML)
    let newCount = likeCount + 1
    likes.innerHTML = newCount
     fetch(likeURL, {
       method: "POST",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({image_id: 3839})
     })
    //  .then(r => r.json())
    //   .then(function(obj) {
    //     return newCount
    //   })
  }

  function createComment() {
    const commentForm = document.querySelector("#comment_form")
    commentForm.addEventListener('submit', handleForm)
  }

  function handleForm(e) {
    e.preventDefault()
    const commentInput = document.querySelector("#comment_input").value
    liComment.innerHTML = commentInput
    ulComment.append(liComment)
    

    fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_id: 3839,
          content: commentInput})
      })
     }
})
