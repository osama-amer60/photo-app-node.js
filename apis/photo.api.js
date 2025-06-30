const router = require("express").Router();
const { uploadImg } = require("../common/uploadImg");
const { addPhoto, up, down, getPhotos } = require("../services/photo.service");

router.post("/", uploadImg("path"), addPhoto);
router.post("/up", up);
router.post("/down", down);
router.get("/", getPhotos);
module.exports = router;
