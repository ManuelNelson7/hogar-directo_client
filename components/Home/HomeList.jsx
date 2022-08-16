import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BiArea, BiBath, BiBed } from 'react-icons/bi'

import Image from '../Image/Image'
import { sanityClient } from '../../sanity'
import { formatPrice, homeQuery } from '../../utils/utils'

const HomeList = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        sanityClient.fetch(homeQuery)
            .then(data => {
                setProperties(data)
                setLoading(false)
            })

    }, [])

    return (
        <div className="bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Propiedades más vistas</h2>
                    <p href="#" className="whitespace-nowrap text-sm font-bold text-sky-500 hover:text-sky-600">
                        Ver todas<span aria-hidden="true"> &rarr;</span>
                    </p>
                </div>

                {loading ?
                    <h1>Loading</h1>
                    :
                    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                        {properties.map((property) => (
                            <Link key={property.slug} href={`/propiedad/${property.slug}`}>
                                <a className='hover:opacity-75 transition-all duration-100 border border-gray-300 rounded-lg'>
                                    <div className="flex flex-col cursor-pointer">
                                        <div className="h-64 w-full rounded-t-lg overflow-hidden bg-gray-100">
                                            <Image identifier='classic-image' image={property.mainImage} />
                                        </div>

                                        <div className="mt-2 flex flex-col py-3 items-center w-full">
                                            <div className='flex flex-col w-11/12'>
                                                <h3 className='font-medium'>
                                                    {property.title.length > 30 ? `${property.title.slice(0, 30)}...` : property.title}
                                                </h3>
                                                <p className='text-sky-500 font-semibold'>{formatPrice(property.price)}</p>
                                            </div>

                                            <div className='flex justify-between mt-2 pt-2 w-10/12 border-t border-t-gray-300'>
                                                <div className='flex items-center'>
                                                    <BiArea className='h-6 text-gray-500' />
                                                    <p className='ml-1 text-sm text-gray-500'>{property.totalSuperficie ? property.totalSuperficie : 0} m²</p>
                                                </div>

                                                <div className='flex gap-3'>
                                                    <div className='flex items-center'>
                                                        <BiBed className='h-6 text-gray-500' />
                                                        <p className='ml-1 text-sm text-gray-500'>{property.ambientes}</p>
                                                    </div>

                                                    <div className='flex items-center'>
                                                        <BiBath className='h-6 text-gray-500' />
                                                        <p className='ml-1 text-sm text-gray-500'>{property.bathrooms}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>

                }
            </div>
        </div>
    )
}

export default HomeList