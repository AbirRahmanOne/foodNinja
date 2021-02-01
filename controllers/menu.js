const Menu = require("../models/menu");
const createCategories = require('../utils/createCategories')


// add menu in 
const addMenu = (req, res) => {
  const menuObject = {
    name: req.body.name,
  };

  if (req.body.parentId) {
    menuObject.parentId = req.body.parentId;
  }

  const val = new Menu(menuObject);
  val.save((error, menu) => {
    if (error) return res.status(400).json({ error });
    if (menu) {
      return res.status(200).json({ menu });
    }
  });
};

// get menu items 
const getMenu = (req, res) => {
  Menu.find({}).exec((error, menu) => {
    if (error) return res.status(400).json({
       error 
      });
    const menuArray = createCategories(menu);
    if (menu) res.status(200).json({
       menuArray 
      });
  });
};

module.exports = {
  addMenu,
  getMenu,
}