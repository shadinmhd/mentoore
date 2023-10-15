import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="flex justify-between items-center w-screen py-3 px-10 bg-blue-500">
      <div className="font-sans hidden sm:block text-white text-xl font-semibold">
        Mentoore
      </div>
      <div className="grid grid-cols-2 gap-2">
        <p className="text-white col-span-2 font-semibold">Links</p>
        <Link className="text-white" to="/mentors" >mentors</Link>
        <Link className="text-white" to="/about" >about us</Link>
        <Link className="text-white" to="/contact" >contacts</Link>
      </div>
      <div>
        <Link className="bg-white text-blue-500 px-2 py-2 rounded-md text-sm sm:text-base font-semibold text-center" to="/mentor/register" >
          Register as mentor
        </Link>
      </div>
    </footer>
  )
}

export default Footer