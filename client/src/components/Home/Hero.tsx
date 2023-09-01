import { Link } from "react-router-dom"
import heroImage from "../../assets/hero.png"
import searchIcon from "../../assets/search.svg"

const Hero = () => {
    return (
        <div className="flex px-10 h-screen pt-20 w-screen overflow-x-hidden">
            <div className="h-full gap-2 flex-col">
                <div className="text-7xl font-semibold">
                    start <span className="text-blue-500">become</span>  your <br />
                    best <span className="text-blue-500">self</span>
                </div>
                <div className="text-gray-500 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Risus dignissim faucibus id sit consequat. Vivamus <br /> quam senectus vitae dolor ac.
                </div>
                <div className="max-h-full pt-44">
                    <Link className="flex justify-center items-center w-fit gap-2 text-white text-xl bg-blue-600 px-4 py-2 rounded-lg font-semibold" to="/mentors" >
                        <img src={searchIcon} />
                        search mentors
                    </Link>
                </div>
            </div>
            <div className="relative">
                <div className="absolute h-[500px] z-0 w-[500px] bg-blue-500 rounded-full top-[50px] left-[50px] blur-3xl shadow-blue-500 drop-shadow-2xl"></div>
                <img className="w-[526px] relative z-10" src={heroImage} alt="hero image" />
            </div>
        </div>
    )
}

export default Hero