import { useContext, useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { HomeIcon } from '@heroicons/react/outline'
import Link from "next/link"
import { AppContext } from "../../components/AppContext"
import { useRouter } from "next/router"

const Ingresar = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");

  const router = useRouter();

  let { signup, loginWithGoogle, loginWithFacebook } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  }

  const handleGoogleSignUp = async () => {
    await loginWithGoogle()
    router.push("/")
  }

  const handleFacebookSignUp = async () => {
    try {
      await loginWithFacebook()
      router.push("/")
    } catch {
      setError("Error al ingresar con Facebook")
    }
  }

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email) && setError("Invalid email");
    user.password.length < 6 && setError("Password must be at least 6 characters");
    user.name.length < 3 && setError("Name must be at least 3 characters");
    if (user) {
      if (user.password.length > 5 && user.name.length > 2) {
        try {
          await signup(user.email, user.password, user.name);
          push('/')
        } catch (e) {
          error.code === "auth/email-already-in-use" && setError("Email already in use")
          error.code === "auth/invalid-email" && setError("Invalid email")
          error.code === "auth/weak-password" && setError("Password is too weak")
        }
      }
    } else {
      setError("Please fill in all fields")
    }
  }


  return (
    <Layout>
      <div className="min-h-screen -mt-16 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <HomeIcon className="h-10 w-10 mx-auto text-teal-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresá a tu cuenta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No tenés una cuenta?{' '}
            <Link href='/registrarse'>
              <a className="font-semibold underline text-teal-500 hover:text-teal-600">
                Registrate gratis
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Recordame
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-teal-600 hover:bg-teal-700 font-semibold"
                >
                  Ingresar
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continuá con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">

                <div onClick={handleGoogleSignUp}>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <img src="/img/google-icon.svg" className="h-5 w-5" alt="" />
                  </a>
                </div>

                <div onClick={handleFacebookSignUp}>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Ingresar
