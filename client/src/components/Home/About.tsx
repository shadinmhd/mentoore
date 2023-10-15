const About = () => {
    return (
        <div className="flex flex-col p-3 sm:p-10 gap-10 items-center justify-center h-screen w-screen">
            <div className="w-5/6 text-center text-xl flex flex-col items-center justify-center">
                <div className="text-blue-600 text-3xl font-bold">
                    About
                </div>
                <div  className="text-gray-500">
                    Welcome to mentoore, the premier platform for connecting individuals with expert mentors to help them achieve their personal and professional goals. Our mission is to empower people to learn, grow, and thrive through personalized, one-on-one mentoring experiences.
                </div>
            </div>
            <div className="w-5/6 text-center text-xl flex flex-col items-center justify-center">
                <div className="text-blue-600 text-3xl font-bold">
                    what we do
                </div>
                <div className="text-gray-500">
                    At mentoore, we bridge the gap between those seeking guidance and experienced mentors willing to share their knowledge and expertise. Our platform offers a diverse array of mentors, each with unique skills and experiences, covering a wide range of subjects. Whether you're looking to advance your career, improve a skill, or simply gain valuable insights, our mentors are here to guide and support you.
                </div>
            </div>
        </div>
    )
}

export default About