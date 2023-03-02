const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    invited_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
