import { Op } from "sequelize";
import { User } from "../../db";
import { Model } from "sequelize";


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
  orderPriority = OrderPriority.DESC
) => {
  const parsedFilters = filters ? JSON.parse(filters) : {};

  const orderOptions = (type: OrderType, priority: OrderPriority): OrderItem[] => {
      switch (type) {
        case "name":
          return [['name', priority]];
        case "createdAt":
          return [['createdAt', priority]];
        default:
          return undefined;
      }
  
  };

  const orderOption = orderOptions(orderType, orderPriority);

  if (!name) {
    console.log(orderOption)
    const users = await User.findAll({
      where: { ...parsedFilters },
      attributes: attributes,
      order: orderOption
    });

    return users;
  }

  const userByName = await User.findAll({
    where: {
      ...parsedFilters,
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: attributes,
    order:orderOption
  });

  return userByName;
};

export default getUserHandler;
