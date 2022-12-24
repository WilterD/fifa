import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render('index',{title: 'Home'});
});

router.get("/about", (req, res) => {
  res.render('about',{title: 'Home'});
});

export default router;