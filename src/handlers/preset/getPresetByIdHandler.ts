import { Preset, UserPreset } from "../../db";

interface Review {
  message: string;
  rating: number;
}

interface PresetInfo {
  id: number;
  name: string;
  price: number;
  color: string;
  type: string;
  category: string;
  reviews: Review[];
  ratingAverage: number;
  purchased: number;
  isDisabled: boolean;
  release: Date;
}

const getPresetByIdHandler = async (
  id: number | undefined
): Promise<PresetInfo> => {
  if (!id) throw new Error("Missing id");

  const { dataValues: data } = await Preset.findOne({ where: { id } });
  if (!data) throw new Error("Preset not found with the specified id");

  const userPresets = await UserPreset.findAll({ where: { id } });
  const reviews: Review[] = userPresets.map((userPreset) => {
    const review = userPreset.dataValues.reviews;
    return {
      message: review.dataValues.ratingMessage,
      rating: review.dataValues.rating,
    };
  });

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const ratingAverage = reviews.length > 0 ? totalRatings / reviews.length : 0;

  const preset: PresetInfo = {
    id: data.id,
    name: data.name,
    price: data.price,
    color: data.defaultColor,
    type: data.type,
    category: data.category,
    reviews,
    ratingAverage,
    purchased: data.users ? data.users.length : 0,
    isDisabled: data.isDisabled,
    release: data.createdAt,
  };

  return preset;
};

export default getPresetByIdHandler;
