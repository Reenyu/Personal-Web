const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 示例数据
let articles = [
    { title: '文章标题1', content: '文章内容1', date: '2024-05-17' },
    { title: '文章标题2', content: '文章内容2', date: '2024-05-18' }
];

let comments = [];

// 搜索文章和图片/视频
app.get('/search', (req, res) => {
    let title = req.query.title;
    let date = req.query.date;
    let results = articles.filter(article => {
        return (title ? article.title.includes(title) : true) &&
               (date ? article.date === date : true);
    });
    res.json(results);
});

// 提交留言
app.post('/comment', (req, res) => {
    let comment = req.body.comment;
    comments.push(comment);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let title = document.getElementById('search-title').value;
    let date = document.getElementById('search-date').value;
    // Implement search functionality here
    console.log(`Searching for title: ${title}, date: ${date}`);
});

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let commentText = document.getElementById('comment-text').value;
    // Implement comment submission functionality here
    console.log(`New comment: ${commentText}`);
    addComment(commentText);
});



// Function to add a comment
function addComment(comment) {
    let commentList = document.getElementById('comment-list');
    let commentItem = document.createElement('div');
    commentItem.textContent = comment;
    commentItem.classList.add('comment-item');

}