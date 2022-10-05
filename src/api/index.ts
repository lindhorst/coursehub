export const fetchCategories = async (id: number) => {
	return await fetch('https://courses-top.ru/api/top-page/find', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ firstCategory: id })
	}).then((res) => res.json());
};
