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
  "id",
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

interface adminQueries {
  _start?: number;
  _end?: number;
  _order?: OrderPriority;
  _sort?: OrderType;
  id?: number;
  name?: string;
  isDisabled?: boolean;
}

const getUserHandler = async ({
  _order = OrderPriority.ASC,
  _sort = OrderType.NAME,
  id,
  name,
  isDisabled,
}: adminQueries) => {
  let user;
  if (id) {
    user = await User.findByPk(id);
    const {
      name,
      email,
      logo,
      about,
      firstname,
      lastname,
      country,
      city,
      zipcode,
      isDisabled,
      createdAt,
    } = user.dataValues;
    return [
      {
        id,
        name,
        email,
        logo,
        about,
        firstname,
        lastname,
        country,
        city,
        zipcode,
        isDisabled,
        createdAt,
      },
    ];
  }

  const filter = isDisabled != undefined ? {isDisabled} : {}
  
  console.log(_sort,_order)

  const orderOption: OrderItem[] = [[_sort, _order]];

  if (!name) {
    user = await User.findAll({
      where: { ...filter },
      attributes: attributes,
      order: orderOption,
    });
    return user.map((usersData) => usersData.dataValues);
  }

  user = await User.findAll({
    where: {
      ...filter,
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
