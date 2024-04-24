import bcrypt from 'bcrypt';
import prisma from '../lib/Prisma.js';

export const register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// Hashed The Password
		const hashedPassword = await bcrypt.hash(password, 10);

		console.log(hashedPassword);

		// Create a new user and save in the db
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		console.log(newUser);

		res.status(201).json({ message: 'User created successfully!' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to create user!' });
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		//CHECK IF THE USER EXIST OR NOT
		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials!' });
		}
		// CHECK IF THE PASSWORD IS CORRECT
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials!' });
		}
		// GENERATE COOKIE TOKEN AND SEND IT TO THE USER

		res.setHeader('Set-Cookie', 'test=' + 'myValue').json('success');
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to login!' });
	}
};

export const logout = (req, res) => {
	// DB OPERATIONS
};