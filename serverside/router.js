import { Router } from "express";
import * as prod from "./requestHandler.js";
import Auth from './middleware/Auth.js'

const router=Router();

router.route("/getproducts").get(Auth,prod.getProducts);
router.route("/signup").post(prod.signUp);
router.route("/signin").post(prod.signIn);
router.route("/getuser/:id").get(prod.getUser)

export default router;