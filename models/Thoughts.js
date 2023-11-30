const { Schema, Types } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    typer: Date,
    default: Date.now,
  },
  username: {
    type: Schema.Types.ObjectId,
    user: "name",
  },
});

postSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
