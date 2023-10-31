import {
    Model,
    Table,
    Column,
    Validate,
    Length,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    IsEmail,
    BelongsTo
} from "sequelize-typescript";
import User from "./User";
import Preset from "./Preset";

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

    @Length({ max: 200 })
    @Column
    ratingMessage!: string;

    @ForeignKey(() => User)
    @IsEmail
    @Column
    userEmail!: string;
  
    @ForeignKey(() => Preset)
    @Column
    presetId!: number;

    @BelongsTo(() => Preset)
    preset!: Preset;
  
    @BelongsTo(() => User)
    user!: User;
}

export default Review;