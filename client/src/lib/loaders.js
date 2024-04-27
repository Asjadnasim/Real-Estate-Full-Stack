import apiRequest from './apiRequest';

export const SinglePageLoader = async ({ request, params }) => {
	const res = await apiRequest.get('/posts/' + params.id);
	return res.data;
};
