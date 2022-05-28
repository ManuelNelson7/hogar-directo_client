import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import PropiedadDetails from '../../components/Propiedad'
import { sanityClient } from '../../sanity'
import { propertyQuery } from '../../utils'
import { useRouter } from 'next/router'

const Property = () => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const query = propertyQuery(router.query.slug)

        sanityClient.fetch(query)
            .then(data => {
                setProperty(data[0])
                console.log(data[0])
            })
            .finally(() => setLoading(false))
    }, [])


    return (
        <Layout>
            {loading ?
                <h1>Loading</h1>
                :
                <PropiedadDetails
                    title={property.title}
                    location={property.location}
                    propertyType={property.propertyType}
                    mainImage={property.mainImage}
                    images={property.images}
                    price={property.price}
                    expensas={property.expensas}
                    ambientes={property.ambientes}
                    bathrooms={property.bathrooms}
                    descripcion={property.descripcion}
                    modalidad={property.modalidad}
                    owner={property.owner}
                />}
        </Layout>

    )
}

export default Property