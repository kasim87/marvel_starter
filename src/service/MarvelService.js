
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apikay = 'apikey=2e960df2b8623111fc4f935d1000773b'

    getResource = async (url) => {
        let res = await fetch(url)
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`)
        }
    
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?${this._apikay}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikay}`)
        
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService