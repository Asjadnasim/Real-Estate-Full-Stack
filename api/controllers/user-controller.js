import prisma from '../lib/Prisma.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
	// console.log('It works!');
	try {
		const users = await prisma.user.findMany();

		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Failed to get Users!',
		});
	}
};

export const getUser = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});

		res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Failed to get User!',
		});
	}
};

export const updateUser = async (req, res) => {
	const id = req.params.id;
	const tokenUserId = req.userId;
	const { password, avatar, ...inputs } = req.body;

	if (id !== tokenUserId) {
		return res.status(403).json({ message: 'Not Authorized!' });
	}

	let updatedPassword = null;
	try {
		if (password) {
			updatedPassword = await bcrypt.hash(password, 10);
		}

		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				...inputs,
				...(updatedPassword && { password: updatedPassword }),
				...(avatar && { avatar }),
			},
		});

		const { password: userPassword, ...rest } = updatedUser;

		res.status(200).json(rest);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to update users!' });
	}
};

export const deleteUser = async (req, res) => {
	const id = req.params.id;

	const tokenUserId = req.userId;

	if (id === !tokenUserId) {
		res.status(403).json({ message: 'Not Authorized!' });
	}
	try {
		await prisma.user.delete({
			where: { id },
		});
		res.status(200).json({ message: 'User deleted successfully!' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Failed to get delete user!',
		});
	}
};
