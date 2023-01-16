import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { IAddress } from "../../interfaces/address.interfaces";
import { returnedAddressDataSerializer } from "../../serializers/address.serializers";

const listAddressesService = async (): Promise<IAddress[]> => {
  const addressRepo = dataSource.getRepository(Address);

  const addresses = await addressRepo.find({ relations: { user: true } });

  const returnedAddresses = await returnedAddressDataSerializer.validate(
    addresses,
    { stripUnknown: true }
  );

  return returnedAddresses;
};

export default listAddressesService;
