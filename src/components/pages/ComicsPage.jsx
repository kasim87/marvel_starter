import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

function ComicsPage() {
    
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page with list of our comic"
                    />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage