import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { returnedAddressDataSerializer } from "../../serializers/address.serializers";
import { IAddress } from "../../interfaces/address.interfaces";

const listAddressesService = async (): Promise<IAddress[]> => {
  const addressRepo = dataSource.getRepository(Address);

  const addresses = await addressRepo.find();

  const returnedData: IAddress[] = await returnedAddressDataSerializer.validate(
    addresses,
    {
      stripUnknown: true,
    }
  );

  return returnedData;
};

export default listAddressesService;
