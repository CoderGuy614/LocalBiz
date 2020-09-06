const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isAdmin } = require("../../middleware/auth");
const {
  create,
  bizById,
  bizList,
  getHours,
  postHours,
  updateBiz,
  removeBiz,
  read,
} = require("../../controllers/biz");
const { userById } = require("../../controllers/user");

router.get("/biz/list", bizList);
router.get("/biz/:bizId", read);
router.post("/biz/create/:userId", create);
router.get("/biz/hours/:bizId", getHours);
router.put("/biz/hours/:bizId/:userId", postHours);
router.put("/biz/update/:bizId/:userId", updateBiz);
router.delete("/biz/:bizId/:userId", removeBiz);

router.param("userId", userById);
router.param("bizId", bizById);

module.exports = router;
