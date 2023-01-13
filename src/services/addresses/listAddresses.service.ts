import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { IAddress } from "../../interfaces/address.interfaces";

const listAddressesService = async (): Promise<IAddress[]> => {
  const addressRepo = dataSource.getRepository(Address);

  const addresses = await addressRepo.find();

  return addresses;
};

export default listAddressesService;
