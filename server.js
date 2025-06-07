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

app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const hashedPassword = await bcrypt.hash(newUser.passwordInput, 10);
    await pool.query(`INSERT INTO users (username, email, password_hash, count_of_posts, avatar)
                        VALUES ($1, $2, $3, $4, $5)`,
                    [newUser.username, newUser.emailInput, hashedPassword, 0, '/default-avatar.webp']);
    res.status(201);
    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));