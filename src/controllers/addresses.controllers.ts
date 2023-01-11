
import { Request, Response } from "express";
import createAddressService from "../services/addresses/createAddress.service";
import deleteAddressService from "../services/addresses/deleteAddress.service";
import listAddressesService from "../services/addresses/listAddresses.service";
import updateAddressService from "../services/addresses/updateAddress.service";


const createAddressController = async(req: Request, res:Response) => {
    
    const newAddress = await createAddressService();

    return
}

const deleteAddressController = async(req: Request, res:Response) => {
    
    await deleteAddressService();

    return 
}

const listAddressesController = async(req: Request, res:Response) => {
    
    const addresses = await listAddressesService();

    return ;
}

const updateAddressController = async(req: Request, res:Response) => {
    
    const updateAddress = await updateAddressService();

    return 
}



export { createAddressController, deleteAddressController, listAddressesController, updateAddressController,  }