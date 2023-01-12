import { Request, Response } from "express";
import createAddressService from "../services/addresses/createAddress.service";
import deleteAddressService from "../services/addresses/deleteAddress.service";
import listAddressesService from "../services/addresses/listAddresses.service";
import updateAddressService from "../services/addresses/updateAddress.service";
import { IAddressRequest } from "../interfaces/address.interfaces";

const createAddressController = async (req: Request, res: Response) => {
  const addressData: IAddressRequest = req.body;
  const newAddress = await createAddressService(addressData);

  return res.status(201).json(newAddress);
};

const deleteAddressController = async (req: Request, res: Response) => {
  await deleteAddressService();

  return;
};

const listAddressesController = async (req: Request, res: Response) => {
  const addresses = await listAddressesService();

  return;
};

const updateAddressController = async (req: Request, res: Response) => {
  const updateAddress = await updateAddressService();

  return;
};

export {
  createAddressController,
  deleteAddressController,
  listAddressesController,
  updateAddressController,
};
