import { urlFor } from "../../sanity"

const GalleryImage = ({ identifier, image }) => {
    return (
        <img className="object-cover rounded-lg w-full h-full" src={urlFor(image).url()} />
    )
}

export default GalleryImage