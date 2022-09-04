import { useContext, useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import { HomeIcon } from '@heroicons/react/outline'
import Link from "next/link"
import { AppContext } from "../../components/AppContext"
import { useRouter } from "next/router"
//import Email from '../../utils/Email.jsx'
//import nc from "next-connect";

const Ingresar = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");

  const router = useRouter();

  let { signup, loginWithGoogle, loginWithFacebook, loginWithTwitter } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  }

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle()
      //ACA HAY QUE PONER EL MAIL QUE SE MANDE CON EL MAIL QUE SALE DE GOOGLE, NO SE COMO PASAR ESE DATO//
      //try{
        //await fetch("../api/welcome", {
          //"method": "POST",
          //"headers": { "content-type": "application/json" },
          //"body": JSON.stringify(user)
        //})
        router.push("/")
      //} catch {
        //alert(error)
      //}
    } catch {
      setError("Error al ingresar con Google") // Verificar q onda esto, lo puse mas q nada para q la consola de next no tire error si el usuario cierra el popup
    }
  }

  //const handleFacebookSignUp = async () => {
    //try {
      //await loginWithFacebook()
      //new Email(user.email).sendEmail
      //router.push("/")
    //} catch {
      //setError("Error al ingresar con Facebook") // Verificar q onda esto, lo puse mas q nada para q la consola de next no tire error si el usuario cierra el popup
    //}
  //}

  //const handler = nc();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email) && setError("Invalid email");
    user.password.length < 6 && setError("Password must be at least 6 characters");
    user.name.length < 3 && setError("Name must be at least 3 characters");
    if (user) {
      if (user.password.length > 5 && user.name.length > 2) {
        //handler.post(async (req, res) => {
          // Get user based on POSTed email
          //let user = await User.findOne({ email: req.body.email });
        
          //if (!user) {
            //user = await User.create({
              //email: req.body.email,
            //});
          //}
        
          //try {
            //await new Email(user).sendEmail();
            //return res.status(200).json({
              //success: true,
              //message: 'Check your email to complete login.',
            //});
          //} catch (error) {
            //return res.status(500).json({
              //success: false,
              //message: 'Error sending email. Please try again.',
            //});
          //}
        //});
        //console.log(user)
            try {
              await fetch("../api/welcome", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(user)
              })
              try {
                await signup(user.email, user.password, user.name);
                router.push("/")
              } catch (error) {
                error.code === "auth/email-already-in-use" && setError("Email already in use")
                error.code === "auth/invalid-email" && setError("Invalid email")
                error.code === "auth/weak-password" && setError("Password is too weak")
              }
            } catch (error) {
              alert('Error')
            }
        //alert(user.email)
      }
    } else {
      setError("Please fill in all fields")
    }
  }

  return (
    <Layout>
      <div className="min-h-screen -mt-16 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <HomeIcon className="h-10 w-10 mx-auto text-yellow-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrate en Dueño directo</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ya tenés cuenta?{' '}
            <Link href='/ingresar'>
              <a className="font-semibold underline text-yellow-500 hover:text-yellow-600">
                Iniciá sesión
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Recordame
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-yellow-600 hover:bg-yellow-700 font-semibold"
                >
                  Ingresar
                </button>
                {error && <p className="text-red-600 pt-3 text-sm">{error}</p>}
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

                {/*<div onClick={handleFacebookSignUp}>
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
                </div>*/}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Ingresar
