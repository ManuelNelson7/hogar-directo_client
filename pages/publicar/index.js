import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/AppContext'
import Layout from '../../components/Layout/Layout'
import { sanityClient } from '../../sanity'
import { propertyTypes, provinciasOrdered, fetchDepartamentos } from '../../utils/utils'
import { useRouter } from 'next/router'

const Publicar = () => {
    const [departamentos, setDepartamentos] = useState([])
    let { user } = useContext(AppContext)


    /* https://www.section.io/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/  */
    const [imageAsset, setImageAsset] = useState(null);
    const [imagesArray, setImagesArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [wrongImageType, setWrongImageType] = useState(false);
    const [setField] = useState();
    const router = useRouter()

    const uploadImage = (e) => {
        const selectedImage = e.target.files[0];
        //to input an image to the upload field
        if (selectedImage.type === 'image/png' || selectedImage.type === 'image/svg' || selectedImage.type === 'image/jpeg' || selectedImage.type === 'image/gif' || selectedImage.type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);
            sanityClient.assets
                .upload('image', selectedImage, { contentType: selectedImage.type, filename: selectedImage.name })
                .then((document) => {
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                });
        } else {
            setWrongImageType(true);
        }
    };

    const uploadImageArray = (e) => {
        const selectedImage = e.target.files[0];
        //to input an image to the upload field
        if (selectedImage.type === 'image/png' || selectedImage.type === 'image/svg' || selectedImage.type === 'image/jpeg' || selectedImage.type === 'image/gif' || selectedImage.type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);
            sanityClient.assets
                .upload('image', selectedImage, { contentType: selectedImage.type, filename: selectedImage.name })
                .then((document) => {
                    setImagesArray(...imagesArray, document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                });
        } else {
            setWrongImageType(true);
        }
    };

    const saveImage = () => {
        if (imageAsset?._id) {
            const doc = {
                _type: "photo",
                image: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: imageAsset?._id,
                    },
                },
            };
            sanityClient.createIfNotExists(doc).then(() => {
                alert("Tu anuncio fue enviado a revisión, si cumple los requisitos pronto podrás verlo publicado!")
            });
        } else {
            setField(true);
            setTimeout(() => {
                setField(false);
            }, 2000);
        }
    };

    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            provincia: "06",
            zona: "25 de Mayo",
            address: "",
            propType: "casa",
            modalidad: "alquilar",
            price: "",
            currency: "pesos",
            expensasDisplay: false,
            expensas: 0,
            ambientes: "",
            bathrooms: "",
            bedrooms: "",
            supCubierta: "",
            supTotal: "",
        }
    )

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const publicarPropiedad = (e) => {
        e.preventDefault()
        console.log(formData)
        if (user && formData.title && formData.description && formData.provincia && formData.zona && formData.address && formData.propType && formData.modalidad && formData.price && formData.currency && formData.ambientes && formData.bathrooms && formData.bedrooms && formData.supCubierta && formData.supTotal) {
            const idDoc = formData.title.toLowerCase().replace(/ /g, "-") + Math.random().toString(36).substring(2, 15);
            const doc = {
                _id: idDoc,
                _type: 'property',
                title: formData.title,
                address: formData.address,
                propertyType: formData.propType,
                modalidad: formData.modalidad,
                price: parseInt(formData.price),
                currency: parseInt(formData.currency),
                expensas: parseInt(formData.expensas),
                ambientes: parseInt(formData.ambientes),
                bathrooms: parseInt(formData.bathrooms),
                bedrooms: parseInt(formData.bedrooms),
                superficie: parseInt(formData.supCubierta),
                totalSuperficie: parseInt(formData.supTotal),
                descripcion: formData.description,
                status: 'EN REVISION',
                owner: user.uid, /*aca esta pasando el user ID, no lo reconoce en sanity, hay q ver q onda */
                mainImage: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id,
                    }
                },
                slug: idDoc /* esto no lo reconoce sanity como "type slug" */
            };

            sanityClient.createIfNotExists(doc).then(() => {
                router.push('/')
            }).catch((err) => { console.log(err.message) })
        }
    }

    useEffect(() => {
        console.log(imagesArray)
    }, [imagesArray])

    useEffect(() => {
        formData.provincia ?
            setDepartamentos(fetchDepartamentos(formData.provincia))
            : setDepartamentos(fetchDepartamentos('06'))
    }, [formData.provincia])


    return (
        <Layout>
            {user &&
                <div className="max-w-2xl pt-4 pb-4 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-4">
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Propiedad</h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Ésta es la info de tu propiedad que van a ver los posibles inquilinos:
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" onSubmit={publicarPropiedad} method="POST">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Título de la propiedad
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Departamento en el centro de la ciudad'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                    Descripción
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="about"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        rows={3}
                                                        className="shadow-sm mt-1 py-1 block w-full sm:text-sm border-2 px-2 border-gray-300 rounded-md"
                                                        placeholder="Departamento en el centro de la ciudad con una vista privilegiada a la playa. Posee una amplia zona de jardín."
                                                        required
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Breve descripción de tu propiedad y requisitos para entrar a tu propiedad, como por ejemplo: no acepto mascotas, solo acepto personas mayores de edad, etc.
                                                </p>
                                            </div>

                                            <div className='grid grid-cols-2 gap-3'>
                                                <div>
                                                    <label htmlFor="propType" className="block text-sm font-medium text-gray-700">
                                                        Provincia
                                                    </label>
                                                    <select
                                                        value={formData.provincia}
                                                        onChange={handleChange}
                                                        name="provincia"
                                                        id="provincia"
                                                        defaultValue={'06'}
                                                        className="block mt-2 w-full px-2 py-2 rounded-lg bg-gray-200 border-0 text-base text-gray-900 placeholder-gray-700 focus:outline-none"
                                                        required
                                                    >
                                                        {provinciasOrdered.map(provincia => (
                                                            <option key={provincia.nombre} value={provincia.id}>{provincia.nombre}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="zona" className="block text-sm font-medium text-gray-700">
                                                        Zona
                                                    </label>
                                                    <select
                                                        value={formData.zona}
                                                        onChange={handleChange}
                                                        name="zona"
                                                        id="zona"
                                                        defaultValue="departamento"
                                                        className="block mt-2 w-full px-2 py-2 rounded-lg bg-gray-200 border-0 text-base text-gray-900 placeholder-gray-700 focus:outline-none"
                                                        required
                                                    >
                                                        {departamentos.length && departamentos.map(departamento => (
                                                            <option key={departamento.nombre} value={departamento.nombre}>{departamento.nombre}</option>
                                                        ))}
                                                    </select>
                                                </div>


                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                    Dirección de la propiedad
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Campichuelo 123'
                                                    required
                                                />
                                            </div>

                                            {/*  INPUT PARA TIPO DE PROPIEDAD   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="propType" className="block text-sm font-medium text-gray-700">
                                                    Tipo de propiedad
                                                </label>
                                                <select
                                                    value={formData.propType}
                                                    onChange={handleChange}
                                                    name="propType"
                                                    id="propType"
                                                    defaultValue="departamento"
                                                    className="block mt-2 w-full px-2 py-2 rounded-lg bg-gray-200 border-0 text-base text-gray-900 placeholder-gray-700 focus:outline-none"
                                                    required
                                                >
                                                    {propertyTypes.map(propertyType => (
                                                        <option key={propertyType.value} value={propertyType.value}>{propertyType.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/*  INPUT PARA MODALIDAD   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="modalidad" className="block text-sm font-medium text-gray-700">
                                                    Tipo de operación
                                                </label>
                                                <select value={formData.modalidad} onChange={handleChange} name="modalidad" id="modalidad" required className="block mt-2 w-full px-2 py-2 rounded-lg bg-gray-200 border-0 text-base text-gray-900 placeholder-gray-700 focus:outline-none">
                                                    <option value="alquilar">Alquilar</option>
                                                    <option value="vender">Vender</option>
                                                </select>
                                                {/*<label htmlFor="modalidad-alq">Alquilar</label>
                                                <input type="radio" name="modalidad" id="modalidad-alq" value="Alquilar" onChange={handleChange}/>
                                                <label htmlFor="modalidad-vnd">Vender</label>
                                                <input type="radio" name="modalidad" id="modalidad-vnd" value="Vender" onChange={handleChange}/>*/}
                                            </div>

                                            {/*  INPUT PARA FOTO   */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Foto de portada (¡la más importante!)</label>
                                                {wrongImageType && <p>El archivo debe ser una imagen</p>}

                                                {!imageAsset ?
                                                    (<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        {loading ? <p>Cargando...</p> : (
                                                            <div className="space-y-1 text-center">
                                                                <svg
                                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                <div className="flex text-sm text-gray-600">
                                                                    <label
                                                                        htmlFor="fileUpload"
                                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                                                    >
                                                                        <span>Upload a file</span>
                                                                        <input
                                                                            id="fileUpload"
                                                                            name="fileUpload"
                                                                            type="file"
                                                                            className="sr-only"
                                                                            onChange={uploadImage} />
                                                                    </label>
                                                                    <p className="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                                            </div>
                                                        )}
                                                    </div>)
                                                    : (
                                                        <div className='relative h-full mt-1'>
                                                            <img
                                                                src={imageAsset?.url}
                                                                alt="uploaded-pic"
                                                                className='max-h-72 rounded-lg relative'

                                                            />
                                                            <button
                                                                className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                                                onClick={() => setImageAsset(null)}
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            {/*  FOTOS ADICIONALES   */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Fotos adicionales</label>
                                                {wrongImageType && <p>El archivo debe ser una imagen</p>}

                                                {!imagesArray.length ?
                                                    (<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        {loading ? <p>Cargando...</p> : (
                                                            <div className="space-y-1 text-center">
                                                                <svg
                                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                <div className="flex text-sm text-gray-600">
                                                                    <label
                                                                        htmlFor="fileUploadArray"
                                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                                                    >
                                                                        <span>Upload a file</span>
                                                                        <input
                                                                            id="fileUploadArray"
                                                                            name="fileUpload"
                                                                            type="file"
                                                                            className="sr-only"
                                                                            onChange={uploadImageArray} />
                                                                    </label>
                                                                    <p className="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                                            </div>
                                                        )}
                                                    </div>)
                                                    : (
                                                        <div className='relative h-full mt-1'>
                                                            <div className='flex gap-2'>
                                                                {imagesArray.map((image, index) => (
                                                                    <img
                                                                        key={index}
                                                                        src={image.url}
                                                                        alt="uploaded-pic"
                                                                        className='max-h-64 rounded-lg relative'

                                                                    />))
                                                                }
                                                            </div>
                                                            <button
                                                                className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                                                onClick={() => setImageAsset(null)}
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            {/*  INPUT PARA PRECIO   */}

                                            <div className="grid gap-3 grid-cols-2">
                                                <div>
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                        Precio
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder='Ejemplo: 35000 (sin puntos ni comas)'
                                                        required
                                                        min="0"
                                                    />
                                                </div>

                                                {/*  INPUT PARA MONEDA   */}
                                                <div>
                                                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                                                        Moneda
                                                    </label>
                                                    <select
                                                        value={formData.currency}
                                                        onChange={handleChange}
                                                        name="currency"
                                                        id="currency"
                                                        className="block mt-1 w-full px-2 py-2 rounded-lg bg-gray-200 border-0 text-base text-gray-900 placeholder-gray-700 focus:outline-none"
                                                        required
                                                    >
                                                        <option value="ARS">Pesos</option>
                                                        <option value="USD">Dólares</option>
                                                    </select>
                                                    {/*<label htmlFor="currency-ars">ARS</label>
                                                <input type="radio" name="currency" id="currency-ars" value="ARS" onChange={handleChange}/>
                                                <label htmlFor="currency-usd">USD</label>
                                                <input type="radio" name="currency" id="currency-usd" value="USD" onChange={handleChange}/>*/}
                                                </div>

                                            </div>

                                            {/*  INPUT PARA EXPENSAS   */}

                                            <div>
                                                <input
                                                    type="checkbox"
                                                    name="expensasDisplay"
                                                    id="expensasDisplay"
                                                    checked={formData.expensasDisplay}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="expensasDisplay" className='ml-2'>
                                                    Tiene expensas?
                                                </label>
                                                {formData.expensasDisplay === true && (
                                                    <div className="col-span-6 mt-2 sm:col-span-3">
                                                        <label htmlFor="expensas" className="block text-sm font-medium text-gray-700">
                                                            Expensas
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="expensas"
                                                            id="expensas"
                                                            value={formData.expensas}
                                                            onChange={handleChange}
                                                            className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            placeholder='Ejemplo: 4500 (sin puntos ni comas)'
                                                            required
                                                            min="0"
                                                        />
                                                    </div>
                                                )}
                                            </div>


                                            <div className="grid grid-cols-2 gap-3">
                                                {/*  INPUT PARA AMBIENTES   */}
                                                <div>
                                                    <label htmlFor="ambientes" className="block text-sm font-medium text-gray-700">
                                                        Ambientes
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="ambientes"
                                                        id="ambientes"
                                                        value={formData.ambientes}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder='2'
                                                        required
                                                        min="0"
                                                    />
                                                </div>

                                                {/*  INPUT PARA BAÑOS   */}
                                                <div>
                                                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                                                        Baños
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="bathrooms"
                                                        id="bathrooms"
                                                        value={formData.bathrooms}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder='1'
                                                        required
                                                        min="0"
                                                    />
                                                </div>
                                            </div>


                                            {/*  INPUT PARA DORMITORIOS   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                                                    Dormitorios
                                                </label>
                                                <input
                                                    type="number"
                                                    name="bedrooms"
                                                    id="bedrooms"
                                                    value={formData.bedrooms}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='1'
                                                    required
                                                    min="0"
                                                />
                                            </div>

                                            {/*  INPUT PARA SUPERFICIE CUBIERTA   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="superficie" className="block text-sm font-medium text-gray-700">
                                                    Superficie cubierta (m2)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="supCubierta"
                                                    id="superficie"
                                                    value={formData.supCubierta}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='25'
                                                    required
                                                    min="0"
                                                />{/*esto tiene q estar en m2*/}
                                            </div>

                                            {/*  INPUT PARA SUPERFICIE TOTAL   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="totalSuperficie" className="block text-sm font-medium text-gray-700">
                                                    Superficie total (m2)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="supTotal"
                                                    id="totalSuperficie"
                                                    value={formData.supTotal}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='38'
                                                    required
                                                    min="0"
                                                />{/*esto tiene q estar en m2*/}
                                            </div>

                                            <div className="px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                /* 

                                                ERRORES A RESOLVER:
                                                -PASAR TODOS LOS CAMPOS CORRECTAMENTE: FALTA SLUG y OWNER
                                                -FIJARSE QUE ONDA COMO PASAR LOS INPUT IMGS
                                                
                                                DOCS: https://www.sanity.io/docs/js-client
                                                
                                                */
                                                >
                                                    Publicar
                                                </button>


                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>}

        </Layout>
    )
}

export default Publicar