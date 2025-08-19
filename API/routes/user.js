import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modules/User.js';
import { verifytoken } from '../middleware/verifytoken.js';


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';


router.post('/register', async (req, res) => {
  try {
    const { username, email, password ,repassword} = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    if (password !== repassword){
      res.json({error : '❌ Passwords dosnt match❌ '})
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: '✅ User registered' });
  } catch (err) {
    res.status(500).json({ error: '❌❌❌❌ Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: '❌ Server error' });
  }
});

  router.put('/profile'),verifytoken , async ( req, res ) => {
    try{
      const {username, email , password} = req.body;
      const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      req.user.id,
      updates,
      {new : true }).select("password")
    
      res.json(updatedUser)}
      catch(error) {
        console.log(error)

      }
    } 
router.get('/me', verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
