import { urlFor } from "../../sanity"

const MainImage = ({ image }) => {
    return (
        <img className="rounded-lg object-cover object-center" src={urlFor(image).url()} />
    )
}

export default MainImage