const express = require("express");
const { upload } = require("./controller");

postRouter.post("/post/:category", upload);
