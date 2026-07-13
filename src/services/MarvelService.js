import { useHttp } from "../components/hooks/http.hooks";

const MarvelService = () => {
  const { loading, error, request, clearError, process, setProcess } =
    useHttp();

  const _apiBase = "https://marvel-server-zeta.vercel.app/";

  const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";

  const getAllCharacters = async () => {
    try {
      const res = await request(`${_apiBase}characters?limit=20&${_apiKey}`);
      if (!res?.data?.results) {
        throw new Error("Invalid response structure");
      }
      return res.data.results.map(_transformCharacter);
    } catch (e) {
      console.error("Error fetching all characters:", e);
      throw e;
    }
  };

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      if (!res?.data?.results?.[0]) {
        throw new Error("Character not found");
      }
      return _transformCharacter(res.data.results[0]);
    } catch (e) {
      console.error("Error fetching character:", e);
      throw e;
    }
  };

  const getCharacterByName = async (name) => {
    try {
      const res = await request(
        `${_apiBase}characters?name=${name}&${_apiKey}`,
      );
      if (!res?.data?.results) {
        throw new Error("Character not found");
      }
      return res.data.results.map(_transformCharacter);
    } catch (e) {
      console.error("Error fetching character by name:", e);
      throw e;
    }
  };

  const getAllComics = async () => {
    try {
      const res = await request(`${_apiBase}comics?limit=20&${_apiKey}`);
      if (!res?.data?.results) {
        throw new Error("Invalid response structure");
      }
      return res.data.results.map(_transformComics);
    } catch (e) {
      console.error("Error fetching all comics:", e);
      throw e;
    }
  };

  const getComics = async (id) => {
    try {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      if (!res?.data?.results?.[0]) {
        throw new Error("Comic not found");
      }
      return _transformComics(res.data.results[0]);
    } catch (e) {
      console.error("Error fetching comic:", e);
      throw e;
    }
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
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
    clearError,
    getCharacterByName,
  };
};

export default MarvelService;
