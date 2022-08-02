import { signInWithEmailAndPassword } from '@firebase/auth'
import React, { useState } from 'react'
import { auth, createUserWithEmailAndPassword } from '../../config'
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const router = useRouter()
    const [msgerror, setMsgError] = useState(null)

    const RegistrarUsuario = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
            .then(r => {
                router.push(`/`)//aca redirigir despues del registro
            })
            .catch(e => {
                if (e.code == `auth/invalid-email`) {
                    setMsgError('Formato de email inválido')
                }
                if (e.code == `auth/weak-password`) {
                    setMsgError('La contraseña debe contener 6 caracteres o más')
                }
            })
    }
    const LoginUsuario = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                router.push(`/`)//aca redirigir despues del login
            })
            .catch((err) => {
                if (err.code == `auth/wrong-password`) {
                    setMsgError('Contraseña incorrecta')
                }
            })
    }
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" placeholder="Email" />
                    <input onChange={(e) => { setPass(e.target.value) }} type="password" className="form-control mt-4" placeholder="Password" />
                    <input type="submit" value="Registrar" className="btn btn-dark btn-block mt-4" style={{ backgroundColor: 'red', cursor: 'Pointer' }} />
                </form>
                <button onClick={LoginUsuario} className="btn btn-success btn-block mt-3">Iniciar Sesión</button>
                {
                    msgerror != null ?
                        (
                            <div className="alert alert-danger">
                                {msgerror}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login