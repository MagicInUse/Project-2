import express, { NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, sequelize } from '../config/database';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

// User Registration
router.post('/create', (req, res, next): void => {
  (async () => {
    const { username, email, password } = req.body;

    try {
      // Check if email is already in use
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: 'User registered successfully.',
        user: { id: newUser.id, username: newUser.username },
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  })().catch(next);
});

// User Login
router.post('/login', (req, res, next): void => {
  (async () => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login successful.', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  })().catch(next);
});

export default router;
