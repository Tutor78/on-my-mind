async function postFormHandler(event) {
    event.preventDefault();

    const postContent = document.querySelector('#post-content').value.trim();
    const title = document.querySelector('#post-title').value.trim();

    if (title && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                postContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Please make sure you have a title and content.');
    }
};

document.querySelector('.post-form').addEventListener('submit', postFormHandler);