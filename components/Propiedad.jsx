
import { useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { formatPrice, isMultiple } from '../utils'
import Image from './Image'


const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const PropiedadDetails = ({
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
    const [selectedColor, setSelectedColor] = useState(product.colors[0])

    console.log(mainImage)

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col">
                    {/* Image gallery */}
                    <div className="gallery">
                        <div className="flex">
                            <Image identifier='main-image' image={mainImage} />
                        </div>
                        <div className="flex flex-col gap-3 classic-images">
                            {images?.map((image) => (
                                <Image identifier='image' image={image} />
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="pt-4 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className='border-2 py-3 px-4 rounded-xl'>
                            <p className='capitalize font-bold text-yellow-600'>{modalidad}</p>

                            <div className="mt-2">
                                <p className="text-3xl text-gray-900 font-semibold">{formatPrice(price)}</p>
                                {expensas && <p className="text-md text-gray-700">{`+${formatPrice(expensas)} expensas`}</p>}
                            </div>

                            <div className="mt-2">
                                <p className="text-xl text-gray-900 font-semibold capitalize">
                                    {`${propertyType} - ${ambientes} ambiente${isMultiple(ambientes)} - ${bathrooms} baño${isMultiple(bathrooms)}`}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>

                            <div
                                className="text-base text-gray-700 mt-2"
                                dangerouslySetInnerHTML={{ __html: descripcion }}
                            />
                        </div>

                        <div className='border-2 py-3 px-4 rounded-xl mt-6'>
                            <div className="flex">
                                <div className="h-16 w-16 profile-pic">
                                    <Image image={owner.image} />
                                </div>
                                <div className='ml-4 flex flex-col justify-center'>
                                    <h4 className="text-xl font-bold">{owner.name}</h4>
                                    <h3 className='text-yellow-600 font-bold'>Dueño directo</h3>
                                </div>
                            </div>
                        </div>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropiedadDetails