const photoModel = require("../models/photo.model");

module.exports.addPhoto = async (req, res) => {
  const { created_by } = req.body;

  if (req.file) {
    await photoModel.insertMany({ path: req.file.filename, created_by });
    res.json({ message: "success" });
  } else {
    res.json({ message: "Accept only images" });
  }
};

module.exports.up = async (req, res) => {
  const { post_id, created_by } = req.body;

  let isVoted = await photoModel.findOne({
    _id: post_id,
    up: { $in: [created_by] },
  });

  if (isVoted) {
    await photoModel.findByIdAndUpdate(post_id, {
      $inc: { count: -1 },
      $pull: { up: created_by },
    });
    res.json({ message: "You already voted", like: false });
  } else {
    await photoModel.findByIdAndUpdate(post_id, {
      $inc: { count: 1 },
      $push: { up: created_by },
      $pull: { down: created_by },
    });
    res.json({ message: "success", like: true });
  }
};

module.exports.down = async (req, res) => {
  const { post_id, created_by } = req.body;

  let isVoted = await photoModel.findOne({
    _id: post_id,
    down: { $in: [created_by] },
  });

  if (isVoted) {
    await photoModel.findByIdAndUpdate(post_id, {
      $inc: { count: 1 },
      $pull: { down: created_by },
    });
    res.json({ message: "You already voted", like: false });
  } else {
    await photoModel.findByIdAndUpdate(post_id, {
      $inc: { count: -1 },
      $push: { down: created_by },
      $pull: { up: created_by },
    });
    res.json({ message: "success", like: true });
  }
};

module.exports.getPhotos = async (req, res) => {
  const { page = 1 } = req.query; //page need to have validation
  const limit = 10;
  const skip = (page - 1) * limit;

  const photos = await photoModel
    .find()
    .sort({ count: -1 })
    .populate("created_by up down", "name pic_url -_id")
    .skip(skip)
    .limit(limit);
  const count = await photoModel.find({}).countDocuments();

  res.json({
    message: "success",
    pages: Math.ceil(count / limit),
    count,
    page,
    length: photos.length,
    photos,
  });
};
