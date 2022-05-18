import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='pt-14 sm:pt-20'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout