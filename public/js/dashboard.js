async function addBlog() {
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
          const response = await fetch(`/api/blogs`, {
              method: 'POST',
              body: JSON.stringify({ title, content }),
              headers: {
                  'Content-Type': 'application/json',
              },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post blog. Try again!');
        }
    }
};

async function deleteBlog(id) {
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete blog.');
    }
};

async function editBlog(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const content = event.target.childNodes[1].childNodes[1].value.trim();
    console.log(id)
    console.log(content)

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to edit blog.');
    }
}

function btnHandler(event) {
    event.preventDefault();
    const btn = event.target;

    if(btn.hasAttribute('data-delete')) {
        const id = btn.getAttribute('data-delete');
        deleteBlog(id);
    } else if (btn.hasAttribute('data-edit')) {
        const form = btn.closest('section').childNodes[5];

        if (form.style.display === "none") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    }
}

document
    .querySelector('#new-blog-form')
    .addEventListener('submit', addBlog);

document
    .querySelectorAll('.edit-form').forEach(element => 
        element.addEventListener('submit', editBlog));

document
    .querySelectorAll('.btn-box').forEach(element => 
        element.addEventListener('click', btnHandler));
    
