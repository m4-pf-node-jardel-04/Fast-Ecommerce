import { Router } from "express"
import createAddressController from "../controllers/addresses/createAddress.controller"
import deleteAddressController from "../controllers/addresses/deleteAddress.controller"
import listAddressesController from "../controllers/addresses/listAddresses.controller"
import updateAddressController from "../controllers/addresses/updateAddress.controller"



const addressRoutes = Router()

addressRoutes.post('', createAddressController)
addressRoutes.get('', listAddressesController)
addressRoutes.patch('/:id', updateAddressController)
addressRoutes.delete('/:id', deleteAddressController)


export default addressRoutes