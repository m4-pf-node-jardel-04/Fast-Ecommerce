import { Request, Response } from "express";
import createAddressService from "../services/addresses/createAddress.service";
import deleteAddressService from "../services/addresses/deleteAddress.service";
import listAddressesService from "../services/addresses/listAddresses.service";
import listAddressByUserService from "../services/addresses/listAddressByUser.service";
import updateAddressService from "../services/addresses/updateAddress.service";
import { IAddressRequest, IAddressUpdate } from "../interfaces/address.interfaces";

const createAddressController = async (req: Request, res: Response) => {
  const addressData: IAddressRequest = req.body;
  const newAddress = await createAddressService(addressData, req.user.id);

  return res.status(201).json(newAddress);
};

const deleteAddressController = async (req: Request, res: Response) => {
  await deleteAddressService(req.params.id);

  return res.status(204).send();
};

const listAddressesController = async (req: Request, res: Response) => {
  const addresses = await listAddressesService();

  return res.status(200).json(addresses);
};

const listAddressByUserController = async (req: Request, res: Response) => {
  const addressByUserId = await listAddressByUserService(req.params.id);

  return res.status(200).json(addressByUserId);
};

const updateAddressController = async (req: Request, res: Response) => {
  const addressData: IAddressUpdate = req.body;
  const addressId = req.params.id;
  const updateAddress = await updateAddressService(addressData, addressId);

  return res.status(200).json(updateAddress);
};

export {
  createAddressController,
  deleteAddressController,
  listAddressesController,
  listAddressByUserController,
  updateAddressController,
};
