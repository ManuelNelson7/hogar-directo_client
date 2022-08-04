import { urlFor } from "../../sanity"

const ProfilePic = ({ image }) => {
    return (
        <img className="rounded-full w-full h-full object-cover object-center" src={image} />
    )
}

export default ProfilePic