renderPost(1);

async function renderPost(postID) {
    try{
        const postURL = `https://jsonplaceholder.typicode.com/posts/${postID}`
        const postRawData = await fetch(postURL);
        const postData = await postRawData.json();
        const postComments = await getPostComments(postID);

        const post = document.createElement('div');
        post.classList.add('post');
        post.id = "post";

        const postTitle = document.createElement('h1');
        postTitle.classList.add('post__title');
        postTitle.innerText = postData.title

        const postText = document.createElement('p');
        postText.classList.add('post__text');
        postText.innerText = postData.body;

        const postCommentsText = document.createElement('b');
        postCommentsText.classList.add('post__comments-text');
        postCommentsText.innerText = "Комментарии";

        post.append(postTitle, postText, postCommentsText, postComments);

        document.body.append(post)
    } catch(error) {
        console.log(error);
    } 
}

function createCommentElement(commentInfo) {
    const comment = document.createElement('div');
    comment.classList.add('post-comment');

    const postCommentAuthor = document.createElement('span');
    postCommentAuthor.classList.add('post-comment__author');
    postCommentAuthor.innerText = commentInfo.email;

    const postCommentText = document.createElement('span');
    postCommentText.classList.add('post-comment__text');
    postCommentText.innerText = commentInfo.body;
    
    comment.append(postCommentAuthor, postCommentText);

    return comment;
}

async function getPostComments(postID) {
    try {
        const commentURL = `https://jsonplaceholder.typicode.com/comments?postId=${postID}` 
        const commentRawInfo = await fetch(commentURL);
        const commentInfo = await commentRawInfo.json();

        const postComments = document.createElement('div');
        postComments.classList.add('post__comments');

        commentInfo.forEach(comment => {
            postComments.append(createCommentElement(comment));
        });
        return postComments;
    } catch(error) {
        console.log(error)
    }
}

