document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 3841 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImageInfo()
  
  function getImageInfo() {
    fetch(imageURL)
    .then(function(response) {return response.json()})
    .then(function (imgObject){


      // add image to page
      let img = document.createElement("img")
      img.src = imgObject.url
      document.querySelector('#image_card').appendChild(img)

      // add image title
      let imgTitle = document.createElement("h4")
      imgTitle.innerText = imgObject.name
      document.querySelector('#name').appendChild(imgTitle)

      // add like count
      let likeText = document.createElement("span")
      likeText.innerText = imgObject.like_count
      document.querySelector('#likes').appendChild(likeText)

      // add lke button functionality
      let likeBtn = document.getElementById("like_button")
      likeBtn.addEventListener("click",addLike)

      function addLike(event) {
        let currentLikes = parseInt(document.getElementById("likes"))
        console.log(currentLikes)

      }
    

    })
  }

})

