import React from 'react'
import Image from '../Image/Image'
import Link from 'next/link'
import { formatPrice } from '../../utils'

const HomeList = ({ properties }) => {

    return (
        <div className="bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Propiedades más vistas</h2>
                    <p href="#" className="whitespace-nowrap text-sm font-bold text-teal-500 hover:text-teal-600">
                        Ver todas<span aria-hidden="true"> &rarr;</span>
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {properties.map((property) => (
                        <Link key={property.slug.current} href={`/propiedad/${property.slug.current}`}>
                            <div key={property.id} className="flex flex-col cursor-pointer">
                                <div className="h-80 rounded-lg overflow-hidden bg-gray-100">
                                    <Image identifier='classic-image' image={property.mainImage} />
                                </div>
                                <div className="mt-4 flex items-start justify-between text-base font-medium text-gray-900 space-x-8">
                                    <h3 className='font-bold'>
                                        {`${property.title.slice(0, 30)}...`}
                                    </h3>
                                    <p className='text-teal-500 font-semibold'>{formatPrice(property.price)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{property.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeList