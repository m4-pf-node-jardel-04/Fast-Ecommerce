
import { Request, Response } from "express";
import createAddressService from "../../services/addresses/createAddress.service";



const createAddressController = async(req: Request, res:Response) => {
    
    const newAddress = await createAddressService();

    return
}

export default createAddressController;