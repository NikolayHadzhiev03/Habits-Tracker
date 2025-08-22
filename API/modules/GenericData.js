import mongoose from "mongoose";

const GenericDataSchema = new mongoose.Schema({
  payload: Object,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const GenericData = mongoose.model("GenericData", GenericDataSchema);
export default GenericData;
