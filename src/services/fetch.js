const URL_API = 'https://economia.awesomeapi.com.br/json/all';

// essa fetch é pra pegar o token, e podemos fazer a outra aqui mesmo depois
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
