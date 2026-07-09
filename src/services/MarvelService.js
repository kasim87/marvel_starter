import { useHttp } from "../components/hooks/http.hooks";

const MarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = "https://marvel-server-zeta.vercel.app/";

  const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

  // https://marvel-server-zeta.vercel.app/comics?apikey=d4eecb0c66dedbfae4eab45d312fc1df

  // https://marvel-server-zeta.vercel.app/comics?limit=10&apikey=d4eecb0c66dedbfae4eab45d312fc1df

  const getAllCharacters = async () => {
    const res = await request(`${_apiBase}characters?limit=20&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async () => {
    const res = await request(`${_apiBase}comics?limit=20&${_apiKey}`);

    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
    clearError,
  };
};

export default MarvelService;
