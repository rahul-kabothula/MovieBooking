document.addEventListener("DOMContentLoaded", function() {

    const postForm= document.getElementById("postForm");
    if(postForm){
        postForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const postText = document.getElementById("postText").value;
            const postInfo = {postText: postText}
            console.log("Post Object:", postInfo);
            // Add logic to send newUser to the backend (e.g., using fetch)

            // Clear the form
            postForm.reset();
        });
    }
});