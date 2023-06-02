const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { uid, name, email, password, avatar} = req.body

  console.log(req.body)
  if (!uid || !name || !email || !password) {
    console.log(uid)
    console.log(name)
    console.log(email)
    console.log(password)
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    uid,
    name,
    email,
    password: hashedPassword,
    avatar
  })

  // res.status(201).json({'success': 'New user'})

  if (user) {
    res.status(201).json({
      _id: user.id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  console.log(req.body);
  // Check for user email
  const user = await User.findOne({ email })

console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    console.log("hgi")
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}