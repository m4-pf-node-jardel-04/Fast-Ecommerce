import { IAddress, IAddressUpdate } from "../../interfaces/address.interfaces";
import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";

const updateAddressService = async (
  adressData: IAddressUpdate,
  adressId: string
): Promise<IAddress> => {
  const addressRepo = dataSource.getRepository(Address);

  const findAddress = await addressRepo.findOneBy({
    id: adressId,
  });

  if (!findAddress) {
    throw new AppError("Address not find", 404);
  };

  const updateAdress = addressRepo.create({
    ...findAddress,
    ...adressData,
  });
  
  await addressRepo.save(updateAdress);

  return updateAdress;
};

export default updateAddressService;
