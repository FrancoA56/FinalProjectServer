import { Op, Model } from "sequelize";
import { User } from "../../db";

enum OrderType {
  NAME = "name",
  CREATED = "createdAt",
}

enum OrderPriority {
  ASC = "ASC",
  DESC = "DESC",
}
type OrderItem = [string, OrderPriority];

const attributes: string[] = [
  "name",
  "email",
  "logo",
  "about",
  "firstname",
  "lastname",
  "country",
  "city",
  "zipcode",
  "isDisabled",
  "createdAt",
];

const getUserHandler = async (
  name: string | undefined,
  filters: string | undefined,
  orderType = OrderType.NAME,
  orderPriority = OrderPriority.ASC
) => {
  const parsedFilters = filters ? JSON.parse(filters) : {};
  const orderOption: OrderItem[] = [[orderType, orderPriority]];
  let user;
  if (!name) {
    user = await User.findAll({
      where: { ...parsedFilters },
      attributes: attributes,
      order: orderOption,
    });
    return user.map((usersData) => usersData.dataValues);
  }

  user = await User.findAll({
    where: {
      ...parsedFilters,
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: attributes,
    order: orderOption,
  });
  return user.map((usersData) => usersData.dataValues);
};

export default getUserHandler;
