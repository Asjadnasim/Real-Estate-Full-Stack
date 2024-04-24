import express from 'express';
import postRoute from './routes/post-routes.js';
import authRoute from './routes/auth-routes.js';

const app = express();

app.use(express.json());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.listen(3300, () => {
	console.log('Server is running!');
});
