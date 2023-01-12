import { IAddress, IAddressRequest } from "../../interfaces/address.interfaces";
import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const createAddressService = async (
  addressData: IAddressRequest,
  userId: string
): Promise<IAddress> => {
  const userRepo = dataSource.getRepository(User);

  const userAddress = await userRepo.findOneBy({
    address: addressData,
  });

  const idUser = await userRepo.findOneBy({
    id: userId,
  });

  if (userAddress) {
    throw new AppError("Address already create", 409);
  }

  const addressRepo = dataSource.getRepository(Address);

  const createdAddress = addressRepo.create({ ...addressData, user: idUser });
  await addressRepo.save(createdAddress);

  return createdAddress;
};

export default createAddressService;
