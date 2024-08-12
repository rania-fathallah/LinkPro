
$(document).ready(function () {
    $('.like-btn').on('click', function () {
        const postId = $(this).data('post-id');

        // Send an AJAX request to your server to handle the like action
        $.ajax({
            url: `/posts/${postId}/like`, // Adjust the route as needed
            method: 'POST',
            success: function (data) {
                // Update the like count in the UI
                const likeCountElement = $(`.post[data-post-id="${postId}"] .like-count`);
                likeCountElement.text(`${data.likes} likes`);
            },
            error: function (error) {
                console.error('Error liking the post:', error);
            }
        });
    });
});
