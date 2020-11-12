const express = require("express");
const router = express.Router();

const { authJwt, checkRole } = require("../middleware/auth");

const {
  portfolioController,
  getProtfolioById,
  postPortfolioController,
  updatePortfolioController,
  deletePortfolioController
} = require("../controllers/portfolios");
const { userController } = require("../controllers/users");

router.get("/portfolios", portfolioController);
router.get("/portfolios/:id", getProtfolioById);
router.get("/users", userController);

router.post("/portfolios", authJwt, checkRole('admin'), postPortfolioController);

router.patch("/portfolios/:id",  authJwt, checkRole('admin') , updatePortfolioController);

router.delete("/portfolios/:id", authJwt, checkRole('admin') , deletePortfolioController);

module.exports = router;
