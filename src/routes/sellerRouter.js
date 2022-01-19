import express from "express";
import {
  createBusiness,
  getBusinessDetails,
  getSellerProfile,
  sellerGoogleLogin,
  sellerLogin,
  sellerSignup,
} from "../controllers/sellerControllers.js";
import { body, param } from "express-validator";
import {
  allowSellerOnly,
  authenticateSeller,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").notEmpty().isString().isEmail(),
    body("password").notEmpty().isString(),
  ],
  sellerLogin
);

router.post(
  "/signup",
  [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty().isString(),
  ],
  sellerSignup
);

router.post(
  "/business/new",
  [
    authenticateSeller,
    allowSellerOnly,
    body("name").notEmpty().isString(),
    body("description").notEmpty().isString(),
    body("business_category_id").exists().notEmpty().isString(),
  ],
  createBusiness
);

router.get(
  "/business/:id",
  [authenticateSeller, allowSellerOnly],
  getBusinessDetails
);

router.get("/profile", [authenticateSeller, allowSellerOnly], getSellerProfile);

router.post(
  "/login/google",
  [body("token").exists().notEmpty().isString()],
  sellerGoogleLogin
);
export default router;
