import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";

const deleteAddressService = async (addressId: string): Promise<object> => {
  const addressRepo = dataSource.getRepository(Address);
  const address = await addressRepo.findOneBy({ id: addressId });

  if (!address) {
    throw new AppError("Address not find!", 404);
  };

  await addressRepo.remove(address);

  return {};
};

export default deleteAddressService;
