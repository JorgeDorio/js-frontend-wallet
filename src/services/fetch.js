const URL_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  try {
    const response = await fetch(URL_API);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.mesage);
  }
};

export default fetchApi;
