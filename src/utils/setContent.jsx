import Skeleton from "../components/skeleton/Skeleton"
import Spinner from "../components/spinner/Spinner"
import ErrorMessage from "../components/errorMessage/errorMessage"

function setContent(process, Component, data) {

    switch(process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('unexpect process state')
    }
}

export default setContent