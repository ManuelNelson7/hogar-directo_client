import React from 'react'
import Image from '../Image/Image'
import Link from 'next/link'

const HomeList = ({ properties }) => {

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Propiedades más vistas</h2>
                    <a href="#" className="whitespace-nowrap text-sm font-bold text-yellow-600 hover:text-yellow-500">
                        View all<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {properties.map((property) => (
                        <Link href={`/propiedad/${property.slug.current}`}>
                            <a>
                                <div key={property.id} className="flex flex-col">
                                    <div className="h-96 rounded-lg overflow-hidden bg-gray-100">
                                        <Image identifier='classic-image' image={property.mainImage} />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                                        <h3 className='font-bold'>
                                            <a href="#">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {property.title}
                                            </a>
                                        </h3>
                                        <p>{property.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{property.category}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeList