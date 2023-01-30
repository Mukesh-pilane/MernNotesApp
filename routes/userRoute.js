const express = require("express");
const {registerView, loginView, verifiedToken, addCategories, renameCatagories, deleteCategories, getAllCategories} = require('../controllers/userControllers');
const auth = require('../middleware/auth')

const router = express.Router();


router.post("/login", loginView);

router.post("/register", registerView);

router.get('/verify', verifiedToken);

router.route('/Categories')
    .get(auth, getAllCategories)
    .put(auth, addCategories)
    .post(auth, deleteCategories)

router.route('/rename')
    .put(auth, renameCatagories)
    
    
module.exports = router;

