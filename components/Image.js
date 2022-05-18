import { urlFor } from "../sanity"

const Image = ({ identifier, image }) => {
    return (
        <img className={identifier === "main-image" ? "main-image" : 'image'} src={urlFor(image).url()} />
    )
}

export default Image