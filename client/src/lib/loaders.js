import apiRequest from './apiRequest';

export const SinglePageLoader = async ({ request, params }) => {
	const res = await apiRequest.get('/posts/' + params.id);
	return res.data;
};

export const ListPageLoader = async ({ request, params }) => {
	// console.log(request);
	const query = request.url.split('?')[1];
	const res = await apiRequest.get('/posts?' + query);
	return res.data;
};
