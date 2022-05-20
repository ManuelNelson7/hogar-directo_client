import { urlFor } from "../../sanity"

const ProfilePic = ({ image }) => {
    return (
        <img className="rounded-full" src={urlFor(image).url()} />
    )
}

export default ProfilePic