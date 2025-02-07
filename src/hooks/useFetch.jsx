import { useState, useEffect } from "react";

const useFetch = (...urls) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(async (response) => {
          if (response.status === 404) throw new Error('Not Found')
          return response.json();
        }));
        setData(data);
        setIsPending(false);
      } catch (error) {
        setError('Oops! Il y a eu une erreur : ' + error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  return {data, isPending, error};
};

export default useFetch;