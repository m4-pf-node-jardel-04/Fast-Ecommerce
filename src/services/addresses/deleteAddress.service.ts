import dataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";

const deleteAddressService = async (addressId: string) => {
  const addressRepo = dataSource.getRepository(Address);
  const address = await addressRepo.findOneBy({ id: addressId });

  if (!address) {
    throw new AppError("Address not find!", 404);
  }

  await addressRepo
    .createQueryBuilder("address")
    .delete()
    .from(Address)
    .where("id = :id", { id: addressId })
    .execute();

  return {};
};

export default deleteAddressService;
