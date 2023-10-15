import React from "react"

interface userType {
    _id: string,
    name: string,
    email: string,
    verified : boolean,
    status : string
}

interface IUserContext {
    user: userType,
    setUser: (user: userType) => void
}

const UserContext = React.createContext<IUserContext | undefined>(undefined)

export default UserContext