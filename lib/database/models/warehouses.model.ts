import { Schema, model, models } from "mongoose";

const WarehouseSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

WarehouseSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastPart = await Warehouse.findOne().sort({
      id: -1,
    });
    this.id = lastPart ? lastPart.id + 1 : 1;
  }
  next();
});

const Warehouse =
  models.Warehouse || model("Warehouse", WarehouseSchema);

export default Warehouse;
