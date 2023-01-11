
import { Request, Response } from "express";
import updateAddressService from "../../services/addresses/updateAddress.service";


const updateAddressController = async(req: Request, res:Response) => {
    
    const updateAddress = await updateAddressService();

    return 
}

export default updateAddressController;