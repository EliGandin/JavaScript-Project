import { Request, Response } from "express";
import db from "../util/db";
import { Post } from "../models/post.model";
import {
  getAllPosts,
  getPostById,
  insertPost,
} from "../repositories/post.repository";

export const getIndex = async (req: Request, res: Response) => {
  try {
    const data = await getAllPosts();
    return res.status(200).json({ message: "index", data: data });
  } catch {
    console.error();
  }
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await getPostById(Number(id));

    res.status(200).json({ message: "Fetched Post Successfully", data: data });
  } catch {
    console.error();
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
    const { postId, location, userId, story } = req.body;
    const post = new Post(postId, location, userId, story);
    const data = await insertPost(post);
    return res
      .status(201)
      .json({ message: "Post Created Successfully", data: data });
  } catch (err) {
    console.error();
    res.status(500).json({ message: "Failed To Create Post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("TESTING");
  console.log(id);
  try {
    await db.query("DELETE FROM trackie.posts WHERE id=?", [id]);
    res.status(204).json({ message: `Post ${id} Deleted Successfully` });
  } catch {
    console.error();
  }
};
