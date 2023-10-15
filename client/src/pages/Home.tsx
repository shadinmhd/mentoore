import Footer from '@/components/Footer'
import About from '@/components/Home/About'
import Hero from '@/components/Home/Hero'
import Navbar from '@/components/Navbar'
import Api from '@/services/Api'
import {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            if (localStorage.getItem("token")) {
                const { data } = await Api.get("/otp/status")
                if (!data.verified)
                    navigate("/otp")
            }
        })()
    }, [])

    return (
        <div className='flex flex-col'>
            <Navbar />
            <Hero />
            <About />
            <Footer />
        </div>
    )
}

export default Home