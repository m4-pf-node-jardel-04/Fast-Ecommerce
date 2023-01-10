
import { Request, Response } from "express"
import listUserByIdService from "../../services/users/listUserById.service"


const listUserByIdController = async(req: Request, res:Response) => {
    
    const user = await listUserByIdService()

    return 
}

export default listUserByIdController