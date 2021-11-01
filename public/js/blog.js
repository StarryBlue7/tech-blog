const addComment = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-box').value.trim();
    const blog_id = document.location.toString().split('/').pop();

    if (text) {
          const response = await fetch(`/api/comments`, {
              method: 'POST',
              body: JSON.stringify({ text, blog_id }),
              headers: {
                  'Content-Type': 'application/json',
              },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment. Try again!');
        }
    }
};

const deleteComment = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete blog.');
        }
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', addComment);

document
    .querySelector('#comments')
    .addEventListener('click', deleteComment);