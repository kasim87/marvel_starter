import { useHttp } from "../components/hooks/http.hook"

const MarvelService = () => {
    const {loading, error, request, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=2e960df2b8623111fc4f935d1000773b'
    const _baseOffset = 210
// ad8f3f5e0022370ea152727c839e62ed      3
// 2e960df2b8623111fc4f935d1000773b    2
// 8baa88906c5928d2b76ef9a039712c7e    1

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
                                        // characters/1009664
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        // console.log(_transformCharacter(res.data.results[0]))

        return _transformCharacter(res.data.results[0])

    }

    const getAllComics = async (offset = _baseOffset ) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        
        return res.data.results.map(_transformComic)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        
        return _transformComic(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'There is no description for this comic',
            pageCount: comic.pageCount ? `${comic.pageCount} p` : 'No information about the number of pages',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            language: comic.textObjects[0]?.language || "en-us",
            prices: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not available'
        }
    }

    return {
            loading,
            error,
            getAllCharacters,
            getCharacter,
            getCharacterByName,
            clearError,
            getAllComics,
            getComic
        }
}

export default MarvelService


