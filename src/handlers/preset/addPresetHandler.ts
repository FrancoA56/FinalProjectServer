import { Preset, PresetImage } from "../../db";

enum PresetTypes {
  ABOUT = "about",
  HOME = "home",
  CART = "card",
  SHOP = "shop",
  DETAIL = "detail",
  PROFILE = "profile",
}
enum PresetCategories {
  BASIC = "basic",
  MEDIUM = "medium",
  PREMIUM = "premium",
}

interface Preset {
  name?: string;
  price?: number;
  defaultColor?: string;
  type?: PresetTypes;
  category?: PresetCategories;
  images?: string[];
  url?: string;
}

const addPresetHandler = async ({
  name,
  price = 1,
  defaultColor,
  type = PresetTypes.HOME,
  category = PresetCategories.BASIC,
  images,
  url,
}: Preset) => {
  if (!name || !price || !defaultColor || !type || !category)
    throw new Error("Missing data to create a Preset");

  const newPreset = await Preset.create({
    name,
    price,
    defaultColor,
    type,
    category,
    isDisabled: false,
    url,
  });

  const presetImages = images.map((url) => ({
    presetId: newPreset.dataValues.id,
    url,
  }));
  await PresetImage.bulkCreate(presetImages);

  const editedPreset = await Preset.findOne({
    where: { id: newPreset.dataValues.id },
    include: [
      {
        model: PresetImage,
        attributes: ["url"],
      },
    ],
  });
  const formattedImages = editedPreset.dataValues.images.map(
    (img: { url: string }) => img.url
  );

  const data = editedPreset.dataValues;
  return {
    id: data.id,
    name: data.name,
    price: data.price,
    color: data.defaultColor,
    type: data.type,
    category: data.category,
    url: data.url,
    images: formattedImages,
    isDisabled: data.isDisabled,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export default addPresetHandler;
