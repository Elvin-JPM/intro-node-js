const mongoose = require("mongoose");

const anuncioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name."],
    maxlength: [50, "A product name must be 50 characters or less"],
    minlength: [2, "A product name must be 2 characters or more"],
  },
  for_sale: {
    type: Number,
    required: [
      true,
      "You must specify wether you are selling or looking to purchase this product",
    ],
    enum: {
      values: [0, 1],
      message:
        "Enter 0 if you are looking for this product and 1 if you are selling it",
    },
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    min: [1, "Price cannot be 0"],
  },
  photo: {
    type: String,
  },
  tags: {
    type: [String],
    required: [
      true,
      "A product must belong to one or multiple categories, either lyfestyle, work, motor or mobile or multiple",
    ],
    enum: {
      values: ["lifestyle", "motor", "work", "mobile"],
      message:
        "Category must be one or more from lifestyle, motor, work or/and mobile",
    },
  },
  owner: String,
});

anuncioSchema.statics.filters = function (filter, skip, limit, sort, fields) {
  const query = Anuncio.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(fields);
  return query.exec();
};

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
