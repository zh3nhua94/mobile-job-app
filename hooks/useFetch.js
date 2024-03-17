import { useEffect, useState } from "react";
import axios from "axios";

const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
		},
		params: {
			...query,
		},
	};
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.request(options);
			setData(response.data.data);
			setIsLoading(false);
		} catch (err) {
			setError(err);
			alert("There is an Error fetching data");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => {
		fetchData();
	};

	return { data, isLoading, error, refetch };
};

export default useFetch;
