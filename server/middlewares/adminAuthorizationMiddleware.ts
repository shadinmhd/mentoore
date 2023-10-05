import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const adminAuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token)
            return res.send({
                success: false,
                message: "please login"
            })

        const payload = jwt.verify(token, process.env.jwt as string) as { type: string, id: string }
        if (payload.type == "admin") {
            next()
        }
        else
            res.send({
                success: false,
                message: "not authorized"
            })

    } catch (err) {
        console.log("adminAUthorizationMiddlewate.ts",err)
        res.send({
            success: false,
            message: "please login first"
        })
    }
}

export default adminAuthorizationMiddleware