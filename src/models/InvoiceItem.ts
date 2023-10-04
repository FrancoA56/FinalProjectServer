import { 
  Model, 
  Table, 
  Column, 
  BelongsTo, 
  ForeignKey,
  AutoIncrement,
  PrimaryKey
} from "sequelize-typescript";
import Preset from "./Preset";
import Invoice from "./Invoice";

@Table
class InvoiceItem extends Model<InvoiceItem> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  price!: number;

  @ForeignKey(() => Preset)
  @Column
  presetId!: number;

  @ForeignKey(() => Invoice)
  @Column
  invoiceId!: number;

  @BelongsTo(() => Preset)
  preset!: Preset;

  @BelongsTo(() => Invoice)
  invoice!: Invoice;

}

export default InvoiceItem;
