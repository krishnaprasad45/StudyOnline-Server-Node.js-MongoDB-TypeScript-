import { Request, Response } from "express"
import registration from "../../../business/usecases/userUseCases/googleUserSignin"

export default {
    
    googleSignin: async (req: Request, res: Response) => {
        try {
            console.log("googlesignin..fn")
            console.log("name",req.body.displayName)
            console.log("email",req.body.email)

            const data = {
                name: req.body.displayName,
                email: req.body.email,
            }
            res.json(await registration.googleSignin(data))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}