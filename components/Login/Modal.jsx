import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Modal = ({closer}) => {
  return (
    <div className= 'bg-white absolute w-4/5 h-3/4' style={{'zIndex': 1000}}>
        <FaTimes onClick={()=> closer} className='block ml-auto pr-2 pt-2 text-3xl cursor-pointer' />
        <div>
            <p>Ingresar con Google</p>
            <p>Ingresar con credenciales</p>
        </div>
    </div>
  )
}

export default Modal