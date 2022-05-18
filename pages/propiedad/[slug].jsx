import React from 'react'
import { sanityClient } from '../../sanity'

const Property = ({title}) => {
    return (
        <div>{title}</div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug

    const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
       title,
       location,
       propertyType,
       mainImage,
       images,
       price,
       expensas,
       ambientes,
       bathrooms,
       descripcion,
       modalidad
       owner->{
           _id,
              name,
              slug,
              image
       },
   }`

    const property = await sanityClient.fetch(query, { pageSlug })

    if (!property) {
        return {
            props: null,
            notFound: true,
        }
    } else {
        return {
            props: {
                title: property.title,
                location: property.location,
                propertyType: property.propertyType,
                mainImage: property.mainImage,
                images: property.images,
                price: property.price,
                expensas: property.expensas,
                ambientes: property.ambientes,
                bathrooms: property.bathrooms,
                descripcion: property.descripcion,
                modalidad: property.modalidad,
                owner: property.owner,
            },
        }
    }
}

export default Property