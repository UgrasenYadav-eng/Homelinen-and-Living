import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
  {
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },

    title: {
      type: String,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    buttonText: {
      type: String,
      trim: true,
    },

    buttonLink: {
      type: String,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Slider ||
  mongoose.model("Slider", SliderSchema);