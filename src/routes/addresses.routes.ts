import { Router } from "express";
import { createAddressController, deleteAddressController, listAddressesController, updateAddressController } from "../controllers/addresses.controllers";




const addressRoutes = Router();

addressRoutes.post('', createAddressController);
addressRoutes.get('', listAddressesController);
addressRoutes.patch('/:id', updateAddressController);
addressRoutes.delete('/:id', deleteAddressController);


export default addressRoutes;