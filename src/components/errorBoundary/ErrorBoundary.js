import { useState } from "react";

function ErrorBoundary(props) {
    const [error, setError] = useState(false)

    function componentDidCatch() {
        setError(true)
    }

    if (error) {
        return <h2>Something went wrong</h2>
    }

    return props.children
}

export default ErrorBoundary

// import { Component } from "react";
// import errorMessage from "../errorMessage/errorMessage";

// class ErrorBoundary extends Component {
//     state = {
//         error: false
//     }

//     componentDidCatch(error, errorInfo) {
//         console.log(error, errorInfo);
//         this.setState({
//             error: true
//         })
//     }

//     render() {
//         if (this.state.error) {
//             return <ErrorMessage/>
//         }

//         return this.props.children;
//     }
// }

// export default ErrorBoundary;