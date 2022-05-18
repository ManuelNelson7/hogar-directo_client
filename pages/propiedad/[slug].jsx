import React from 'react'
import Layout from '../../components/Layout/Layout'
import PropiedadDetails from '../../components/Propiedad'
import { sanityClient } from '../../sanity'

const Property = ({
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
    modalidad,
    owner
}) => {
    return (
        <Layout>
            <PropiedadDetails 
                title={title}
                location={location}
                propertyType={propertyType}
                mainImage={mainImage}
                images={images}
                price={price}
                expensas={expensas}
                ambientes={ambientes}
                bathrooms={bathrooms}
                descripcion={descripcion}
                modalidad={modalidad}
                owner={owner}
            />
        </Layout>

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
       modalidad,
       owner->{
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
                expensas: property.expensas || null,
                ambientes: property.ambientes,
                bathrooms: property.bathrooms,
                descripcion: property.descripcion,
                modalidad: property.modalidad,
                owner: property.owner || null,

            },
        }
    }
}

export default Property