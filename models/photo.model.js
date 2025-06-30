const { Schema, model, Types } = require("mongoose");

const photoSchema = new Schema({
  path: String,
  created_by: {
    type: Types.ObjectId,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
    default: 0,
  },
  up:[{ type: Types.ObjectId, ref: "user"}],
  down:[{ type: Types.ObjectId, ref: "user"}]
});

const Photo = model("photo", photoSchema);
module.exports = Photo;
