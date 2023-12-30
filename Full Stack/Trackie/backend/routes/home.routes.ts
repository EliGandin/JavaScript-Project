import {
  getIndex,
  getPost,
  addPost,
  deletePost,
} from "../controllers/home.controller";
import { Router } from "express";

const router = Router();

router.get("/", getIndex);

router.get("/post/:id", getPost);

router.post("/", addPost);

router.delete("/post/:id", deletePost);

export default router;
