import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { MONGODB_ATLAS_URI } from "../constants.js";

const connectToDatabase = () => {
  try {
    mongoose.connect(MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("could not connect", e);
  }
};

export const initialize = () => {
  connectToDatabase();
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
};
