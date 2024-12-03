import { Schema, model, models } from "mongoose";

const FluctuationSchema = new Schema({
  partId: {
    type: Schema.Types.Number,
    ref: "Part",
    required: true,
  },
  type: {
    type: String,
    enum: ["import", "export"],
    required: true,
  },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  warehouse: {
    type: Schema.Types.Number,
    ref: "Warehouse",
    required: true,
  },
});

const Fluctuation =
  models.Fluctuation ||
  model("Fluctuation", FluctuationSchema);

export default Fluctuation;
