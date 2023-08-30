import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import UserRouter from '../user/UserRouter'
import MentorRouter from '../mentor/MentorRouter'
import userActions from '../../redux/features/userActions'
import { useEffect } from "react"
import mentorActions from '../../redux/features/mentorActions'

const TypeRouter = () => {
    const type = useSelector((state: RootState) => state.auth.type)
    useEffect(() => {
        if (type == "user")
            userActions.userGet()
        if (type == "mentor")
            mentorActions.mentorGet()
    }, [])
    return (
        <>
            {
                (type == "user" ? <UserRouter /> : <MentorRouter />)
            }
        </>
    )
}

export default TypeRouter