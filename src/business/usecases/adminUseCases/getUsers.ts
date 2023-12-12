import { getAllUsers } from "../../../adapters/data-access/repositories/adminRepository";;

export const getUsers = async () => {
  const userData = await getAllUsers();
  return userData;
};

module.exports = { getUsers };
