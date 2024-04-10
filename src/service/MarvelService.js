
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apikay = 'apikey=8baa88906c5928d2b76ef9a039712c7e'

    getResource = async (url) => {
        let res = await fetch(url)
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`)
        }
    
        return await res.json()
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?${this._apikay}`)
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apikay}`)
    }
}

export default MarvelService