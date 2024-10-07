import { Router } from "express";
import {signIn,signUp,getProducts} from "./requestHandler.js";
import Auth from './middleware/Auth.js'

const router=Router();

router.route("/getproducts").get(Auth,getProducts)
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)

export default router;