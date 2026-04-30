import pool from '../config/db.js';

const TaskModel = {
  async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
  },

  async findAll(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  async findById(id, userId) {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rows[0];
  },

  async create({ title, description, userId }) {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description || '', userId]
    );
    return rows[0];
  },

  async markCompleted(id, userId) {
    const { rows } = await pool.query(
      `UPDATE tasks SET status = 'completed', updated_at = NOW()
       WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, userId]
    );
    return rows[0];
  },

  async delete(id, userId) {
    const { rows } = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return rows[0];
  },
};

export default TaskModel;
