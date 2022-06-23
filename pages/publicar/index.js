import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/AppContext'
import Layout from '../../components/Layout/Layout'
import { sanityClient } from '../../sanity'

const Publicar = () => {
    let { user } = useContext(AppContext)


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
                                <form action="#" method="POST">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Título de la propiedad
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Departamento en el centro de la ciudad'
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                    Descripción
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="shadow-sm mt-1 py-1 block w-full sm:text-sm border-2 px-2 border-gray-300 rounded-md"
                                                        placeholder="Departamento en el centro de la ciudad con una vista privilegiada a la playa. Posee una amplia zona de jardín."
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Breve descripción de tu propiedad y requisitos para entrar a tu propiedad, como por ejemplo: no acepto mascotas, solo acepto personas mayores de edad, etc.
                                                </p>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Dirección de la propiedad
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Campichuelo #123'
                                                />
                                            </div>

                                            {/*  INPUT PARA TIPO DE PROPIEDAD   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Tipo de propiedad
                                                </label>
                                                <select name="property-type" id="property-type">
                                                    <option value="house">Casa</option>
                                                    <option value="departamento">Departamento</option>
                                                    <option value="ph">PH</option>
                                                    <option value="quinta">Quinta</option>
                                                    <option value="garage">Garage</option>
                                                    <option value="oficina">Oficina comercial</option>
                                                    <option value="local">Local comercial</option>
                                                    <option value="terreno">Terreno</option>
                                                </select>
                                            </div>

                                            {/*  INPUT PARA MODALIDAD   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Tipo de operación
                                                </label>
                                                <label htmlFor="modalidad-alq">Alquilar</label>
                                                <input type="radio" name="modalidad" id="modalidad-alq" value="Alquilar"/>
                                                <label htmlFor="modalidad-vnd">Vender</label>
                                                <input type="radio" name="modalidad" id="modalidad-vnd" value="Vender"/>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Foto de portada (¡la más importante!)</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Fotos adicionales</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  INPUT PARA PRECIO   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Precio
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='35.000'
                                                />
                                                {/*  acá hay que hacer algo para especificar
                                                si es USD  o ARS   */}
                                            </div>

                                            {/*  INPUT PARA EXPENSAS   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Expensas
                                                </label>
                                                <input
                                                    type="number"
                                                    name="expensas"
                                                    id="expensas"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='5.000'
                                                />
                                                {/*  este tiene que ser totalmente opcional  */}
                                            </div>

                                            {/*  INPUT PARA AMBIENTES   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Ambientes
                                                </label>
                                                <input
                                                    type="number"
                                                    name="ambientes"
                                                    id="ambientes"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='2'
                                                />
                                                {/*  aca hay que ver pq capaz algunas propiedades
                                                    son 1 ambiente y medio o asi, capaz conviene
                                                    cambiar el input a 'text'  */}
                                            </div>

                                            {/*  INPUT PARA BAÑOS   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Baños
                                                </label>
                                                <input
                                                    type="number"
                                                    name="bathrooms"
                                                    id="bathrooms"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='1'
                                                />
                                            </div>

                                            {/*  INPUT PARA DORMITORIOS   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Dormitorios
                                                </label>
                                                <input
                                                    type="number"
                                                    name="bedrooms"
                                                    id="bedrooms"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='1'
                                                />
                                            </div>

                                            {/*  INPUT PARA SUPERFICIE CUBIERTA   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Superficie cubierta
                                                </label>
                                                <input
                                                    type="number"
                                                    name="superficie"
                                                    id="superficie"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='25'
                                                />{/*m2*/}
                                            </div>

                                            {/*  INPUT PARA SUPERFICIE TOTAL   */}

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Superficie total
                                                </label>
                                                <input
                                                    type="number"
                                                    name="totalSuperficie"
                                                    id="totalSuperficie"
                                                    className="mt-1 block w-full py-1.5 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='38'
                                                />{/*m2*/}
                                            </div>

                                            <div className="px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (user) {
                                                            const doc = {
                                                                _id: '85',
                                                                _type: 'property',
                                                                title: 'titulo',
                                                                address: 'direccion',
                                                                propertyType: 'house',
                                                                modalidad: 'alquilar',
                                                                price: 35.000,
                                                                expensas: 5.000,
                                                                ambientes: 2,
                                                                bathrooms: 1,
                                                                bedrooms: 1,
                                                                superficie: 25,
                                                                totalSuperficie: 38,
                                                                descripcion: 'descripcion',
                                                                owner: user.uid
                                                            };
                                                            sanityClient.createIfNotExists(doc).then((res) => {
                                                                alert(res)
                                                            }).catch((err) => {console.log(err.message)})
                                                        } 
                                                        else {
                                                            alert('3')
                                                        }}
                                                    }
                                                    /* 

                                                    ERRORES A RESOLVER:
                                                    -PASAR TODOS LOS CAMPOS CORRECTAMENTE: FALTA SLUG
                                                    -VER COMO HACER QUE LOS VALUE DE LOS INPUTS VAYAN
                                                        AL DOC QUE SE PASA A SANITY
                                                    
                                                    revisa esto gordis a ver si a vos te sale https://www.sanity.io/docs/js-client
                                                    
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

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" method="POST">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full py-1 px-2 border-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-4">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                        Country / Region
                                                    </label>
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country"
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                    >
                                                        <option>United States</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option>
                                                    </select>
                                                </div>

                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Street address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                                        State / Province
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        id="state"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                        ZIP / Postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postal-code"
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                    <p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" method="POST">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                            <fieldset>
                                                <legend className="text-base font-medium text-gray-900">By Email</legend>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="comments"
                                                                name="comments"
                                                                type="checkbox"
                                                                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                                Comments
                                                            </label>
                                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="candidates"
                                                                name="candidates"
                                                                type="checkbox"
                                                                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="candidates" className="font-medium text-gray-700">
                                                                Candidates
                                                            </label>
                                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="offers"
                                                                name="offers"
                                                                type="checkbox"
                                                                className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="offers" className="font-medium text-gray-700">
                                                                Offers
                                                            </label>
                                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div>
                                                    <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                                                    <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-everything"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Everything
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-email"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Same as email
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-nothing"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                            No push notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                            >
                                                Save
                                            </button>
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