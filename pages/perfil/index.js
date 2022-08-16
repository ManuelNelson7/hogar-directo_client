import { Fragment, useState, useContext } from 'react'
import { AppContext } from '../../components/AppContext'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import {
    LogoutIcon,
    CogIcon,
    SpeakerphoneIcon,
    KeyIcon,
    MenuIcon,
    UserCircleIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'
import Layout from '../../components/Layout/Layout'

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Jobs', href: '#', current: false },
    { name: 'Applicants', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
]
const subNavigation = [
    { name: 'Mi perfil', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Mis anuncios', href: '#', icon: SpeakerphoneIcon, current: false },
    { name: 'Contraseña', href: '#', icon: KeyIcon, current: false },
    { name: 'Cerrar sesión', href: '#', icon: LogoutIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Perfil = () => {
    let { user } = useContext(AppContext)

    console.log(user)

    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)
    const [allowCommenting, setAllowCommenting] = useState(true)
    const [allowMentions, setAllowMentions] = useState(true)

    return (

        <Layout>
            <main className="relative">
                <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                            <aside className="py-6 lg:col-span-3">
                                <nav className="space-y-1">
                                    {subNavigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-sky-50 border-sky-500 text-sky-700 hover:bg-sky-50 hover:text-sky-700'
                                                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                                'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current
                                                        ? 'text-sky-500 group-hover:text-sky-500'
                                                        : 'text-gray-400 group-hover:text-gray-500',
                                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </a>
                                    ))}
                                </nav>
                            </aside>

                            {!user ? <h1>Loading</h1>
                                :
                                <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                                    {/* Profile section */}
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div>
                                            <h2 className="text-lg leading-6 font-semibold text-gray-900">Mi perfil</h2>
                                        </div>

                                        <div className='mt-6 flex w-full flex-col sm:flex-row sm:justify-between'>
                                            <div className="flex flex-col w-8/12 gap-6">
                                                <div className="col-span-12">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Nombre completo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                        defaultValue={user.displayName}
                                                    />
                                                </div>

                                                <div className="col-span-12">
                                                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="url"
                                                        id="email"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                        defaultValue={user.email}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row">

                                                <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                                    <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                                                        Photo
                                                    </p>
                                                    <div className="mt-1 lg:hidden">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="rounded-full h-12 w-12"
                                                            >
                                                                <img className="rounded-full h-full w-full" src={user.photoURL || 'https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'} alt="Profile picture" />
                                                            </div>
                                                            <div className="ml-5 rounded-md shadow-sm">
                                                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                                    <label
                                                                        htmlFor="mobile-user-photo"
                                                                        className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                                                    >
                                                                        <span>Cambiar</span>
                                                                        <span className="sr-only"> user photo</span>
                                                                    </label>
                                                                    <input
                                                                        id="mobile-user-photo"
                                                                        name="user-photo"
                                                                        type="file"
                                                                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="hidden relative rounded-full overflow-hidden lg:block">
                                                        <img className="relative rounded-full w-40 h-40" src={user.photoURL || 'https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'} alt="" />
                                                        <label
                                                            htmlFor="desktop-user-photo"
                                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                                                        >
                                                            <span>Change</span>
                                                            <span className="sr-only"> user photo</span>
                                                            <input
                                                                type="file"
                                                                id="desktop-user-photo"
                                                                name="user-photo"
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>

                                    {/* Privacy section */}
                                    <div className="pt-6 divide-y divide-gray-200">
                                        <div className="px-4 sm:px-6">
                                            <div>
                                                <h2 className="text-lg leading-6 font-semibold text-gray-900">Mis anuncios</h2>
                                            </div>
                                            <ul role="list" className="mt-2 divide-y divide-gray-200">
                                                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                            Available to hire
                                                        </Switch.Label>
                                                        <Switch.Description className="text-sm text-gray-500">
                                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                                        </Switch.Description>
                                                    </div>
                                                    <Switch
                                                        checked={availableToHire}
                                                        onChange={setAvailableToHire}
                                                        className={classNames(
                                                            availableToHire ? 'bg-sky-500' : 'bg-gray-200',
                                                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                availableToHire ? 'translate-x-5' : 'translate-x-0',
                                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                            )}
                                                        />
                                                    </Switch>
                                                </Switch.Group>
                                                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                            Make account private
                                                        </Switch.Label>
                                                        <Switch.Description className="text-sm text-gray-500">
                                                            Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                                                        </Switch.Description>
                                                    </div>
                                                    <Switch
                                                        checked={privateAccount}
                                                        onChange={setPrivateAccount}
                                                        className={classNames(
                                                            privateAccount ? 'bg-sky-500' : 'bg-gray-200',
                                                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                privateAccount ? 'translate-x-5' : 'translate-x-0',
                                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                            )}
                                                        />
                                                    </Switch>
                                                </Switch.Group>
                                                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                            Allow commenting
                                                        </Switch.Label>
                                                        <Switch.Description className="text-sm text-gray-500">
                                                            Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                                                        </Switch.Description>
                                                    </div>
                                                    <Switch
                                                        checked={allowCommenting}
                                                        onChange={setAllowCommenting}
                                                        className={classNames(
                                                            allowCommenting ? 'bg-sky-500' : 'bg-gray-200',
                                                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                allowCommenting ? 'translate-x-5' : 'translate-x-0',
                                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                            )}
                                                        />
                                                    </Switch>
                                                </Switch.Group>
                                                <Switch.Group as="li" className="py-4 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                            Allow mentions
                                                        </Switch.Label>
                                                        <Switch.Description className="text-sm text-gray-500">
                                                            Adipiscing est venenatis enim molestie commodo eu gravid
                                                        </Switch.Description>
                                                    </div>
                                                    <Switch
                                                        checked={allowMentions}
                                                        onChange={setAllowMentions}
                                                        className={classNames(
                                                            allowMentions ? 'bg-sky-500' : 'bg-gray-200',
                                                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                allowMentions ? 'translate-x-5' : 'translate-x-0',
                                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                            )}
                                                        />
                                                    </Switch>
                                                </Switch.Group>
                                            </ul>
                                        </div>
                                        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                                            <button
                                                type="button"
                                                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Perfil