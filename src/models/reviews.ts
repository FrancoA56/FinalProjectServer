import {
    Model,
    Table,
    Column,
    Validate,
    Length,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    HasOne
} from "sequelize-typescript";
import UserPreset from "./UserPreset";

@Table
class Review extends Model<Review> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Validate({
        min: 1,
        max: 5,
    })
    @Column
    rating!: number;

    @Length({ min: 4, max: 200 })
    @Column
    ratingMessage!: string;

    @HasOne(() => UserPreset)
    userPreset!: UserPreset;
}

export default Review;