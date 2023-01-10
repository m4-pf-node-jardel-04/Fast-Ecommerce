
import { Request, Response } from "express"
import listAddressesService from "../../services/addresses/listAddresses.service"


const listAddressesController = async(req: Request, res:Response) => {
    
    const addresses = await listAddressesService()

    return 
}

export default listAddressesController