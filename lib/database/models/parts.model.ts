import { Schema, model, models } from "mongoose";

const PartSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["sparepart", "consumable", "material"],
    required: true,
  },
  specification: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String },
  category: { type: String },
});

PartSchema.pre("validate", async function (next) {
  if (this.isNew && !this.id) {
    const lastPart = await models.Part.findOne().sort({
      id: -1,
    });
    this.id = lastPart ? lastPart.id + 1 : 1;
  }
  next();
});

const Part = models.Part || model("Part", PartSchema);

export default Part;
