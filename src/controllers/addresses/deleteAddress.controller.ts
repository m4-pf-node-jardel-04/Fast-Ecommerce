
import { Request, Response } from "express";
import deleteAddressService from "../../services/addresses/deleteAddress.service";


const deleteAddressController = async(req: Request, res:Response) => {
    
    await deleteAddressService();

    return 
}

export default deleteAddressController;