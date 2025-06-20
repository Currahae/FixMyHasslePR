import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import bcrypt from 'bcrypt';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// get all users db
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

//create new user db
app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const hashedPassword = await bcrypt.hash(newUser.passwordInput, 10);
    const queryResult = await pool.query(`INSERT INTO users (username, email, password_hash, count_of_posts, avatar)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id, username, email, avatar, count_of_posts`,
                    [newUser.username, newUser.emailInput, hashedPassword, 0, '/default-avatar.webp']);
    res.status(201);
    res.json(queryResult.rows[0]);
});

//check if user exist in db for sign up
app.post('/users/existsSign', async (req, res) => {
    const { username, email } = req.body;

    const result = await pool.query(
        'SELECT 1 FROM users WHERE username = $1 OR email = $2 LIMIT 1',
        [username, email]
    );

    if (result.rows.length > 0) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false});
    }
});

//user Log in
app.post('/users/LogIn', async (req, res) => {
    const { username, email, password } = req.body;

    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND email = $2 LIMIT 1',
        [username, email]
    );

    if (result.rows.length > 0) {
        const isPasswordsMatch = await bcrypt.compare(password, result.rows[0].password_hash);
        if (isPasswordsMatch) {
            res.status(200).json({ answer: 'user_accessed',
                                    id: result.rows[0].id,
                                    username: result.rows[0].username,
                                    email: result.rows[0].email,
                                    countOfPosts: result.rows[0].count_of_posts,
                                    avatar: result.rows[0].avatar
             });
        } else {
            res.status(401).json({ answer: 'wrong_password' });
        }
    } else {
        res.status(404).json({ answer: 'user_dont_exist' });
    }
});

//create new post
app.post('/posts', async (req, res) => {
    const userID = req.body['userID'];
    const issueTitle = req.body['issueTitle'];
    const issueDescription = req.body['issueDescription'];
    const creationDate = req.body['creationDate'];
    const username = req.body['username'];

    const postCreatingPool = await pool.query(
        `INSERT INTO posts (user_id, author_name, title, content, created_at, status)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING id, user_id, author_name, title, content, created_at, status;`,
                        [userID, username, issueTitle, issueDescription, creationDate, 'Open']
    );

    await pool.query(
        `UPDATE users SET count_of_posts = count_of_posts + 1 WHERE id = $1`,
        [userID]
    );

    res.status(201);
    res.json(postCreatingPool.rows[0]);
});

//get all posts
app.get('/posts', async (req, res) => {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
});

//app get single post
app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;

    const result = await pool.query(
        `SELECT * FROM posts WHERE posts.id = $1`,
    [postId]
    );

    res.json(result.rows[0]);
});

app.post('/posts/delete', async (req, res) => {
    const postId = req.body['postID'];

    await pool.query(`DELETE FROM posts WHERE id = $1;`, [postId])

    res.status(200).end()
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));