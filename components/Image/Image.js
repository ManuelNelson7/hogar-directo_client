import { urlFor } from "../../sanity"

const Image = ({ image }) => {
    return (
        <img className="w-full h-full object-cover object-center" src={urlFor(image).url()} />
    )
}

export default Image