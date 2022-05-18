import { formatPrice, isMultiple } from '../utils'
import Image from './Image'
import { MailIcon } from '@heroicons/react/solid'
import { RiWhatsappFill } from 'react-icons/ri'


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

    return (
        <div className="bg-white">
            <div className="max-w-2xl pb-4 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-4">
                <div className="flex flex-col">
                    {/* Image gallery */}
                    <div className="grid grid-cols-[2fr_1fr] gap-3 gallery">
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
                        <div className="grid grid-cols-[2fr_1fr] gap-3">

                            <div className="info">
                                <section className='border-2 py-3 px-4 rounded-xl'>
                                    <p className='capitalize font-bold text-yellow-600'>{modalidad}</p>

                                    <div className="mt-2">
                                        <p className="text-2xl text-gray-900 font-semibold">{formatPrice(price)}</p>
                                        {expensas && <p className="text-md text-gray-700">{`+${formatPrice(expensas)} expensas`}</p>}
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-xl text-gray-900 font-semibold capitalize">
                                            {`${propertyType} - ${ambientes} ambiente${isMultiple(ambientes)} - ${bathrooms} baño${isMultiple(bathrooms)}`}
                                        </p>
                                    </div>
                                </section>

                                <section className="mt-6">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>

                                    <div
                                        className="text-base text-gray-700 mt-2 w-11/12"
                                        dangerouslySetInnerHTML={{ __html: descripcion }}
                                    />
                                </section>

                                <section aria-labelledby="details-heading" className="mt-6">

                                    <h3 className="text-xl font-bold tracking-tight text-gray-900">Ubicación</h3>
                                </section>
                            </div>

                            <div className="form">
                                <div className='border-2 py-3 px-4 rounded-xl bg-gray-100'>
                                    <h4 className='text-xl font-semibold text-gray-900'>Contactá al anunciante</h4>
                                    <div className="flex mt-3">
                                        <div className="h-14 w-14 profile-pic">
                                            <Image image={owner.image} />
                                        </div>
                                        <div className='ml-4 flex flex-col justify-center'>
                                            <h4 className="text-xl font-bold">{owner.name}</h4>
                                            <h3 className='text-yellow-600 font-bold'>Dueño directo</h3>
                                        </div>

                                    </div>

                                    <>
                                        <div className='mt-3'>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="shadow-sm focus:outline-none focus:border-yellow-600 placeholder-gray-700 block w-full p-2.5 sm:text-sm border-2 border-gray-300 rounded-lg"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                className=" mt-2 shadow-sm focus:outline-none focus:border-yellow-600 placeholder-gray-700 block w-full p-2.5 sm:text-sm border-2 border-gray-300 rounded-lg"
                                                placeholder="Nombre"
                                            />

                                            <input
                                                type="text"
                                                name="telefono"
                                                id="telefono"
                                                className="mt-2 shadow-sm focus:outline-none focus:border-yellow-600 placeholder-gray-700 block w-full p-2.5 sm:text-sm border-2 border-gray-300 rounded-lg"
                                                placeholder="Teléfono"
                                            />

                                        </div>

                                        <div className='mt-1'>
                                            <label className='text-sm text-gray-700'>Mensaje</label>
                                            <textarea
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                className="mt-0.5 shadow-sm focus:outline-none focus:border-yellow-600 placeholder-gray-700 block w-full p-2.5 sm:text-sm border-2 border-gray-300 rounded-lg"
                                                placeholder="Hola! Ví la propiedad que publicaste en Hogar Directo y me interesa. ¿Cuándo podríamos coordinar una visita?"
                                            />
                                        </div>

                                        <div className='flex flex-col mt-4 gap-2'>
                                            <button
                                                type="button"
                                                className="flex justify-center font-semibold items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-all duration-75"
                                            >
                                                Contactar
                                                <MailIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                            </button>

                                            <button
                                                type="button"
                                                className="flex justify-center font-semibold items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-75"
                                            >
                                                Contactar por whatsapp
                                                <RiWhatsappFill className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>

                                    </>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropiedadDetails