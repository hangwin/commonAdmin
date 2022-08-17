const Hello = function () {
	return <div>hello:{import.meta.env.VITE_API_PATH}</div>;
};

export default Hello;
