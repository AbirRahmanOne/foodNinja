const Menu = require("../models/menu");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (const x in category) {
    categoryList.push({
      _id: x._id,
      name: x.name,
      children: createCategories(categories, x._id),
    });
  }

  return categoryList;
};

const addMenu = (req, res) => {
  const menuObj = {
    name: req.body.name,
  };

  if (req.body.parentId) {
    menuObj.parentId = req.body.parentId;
  }

  const cat = new Menu(menuObj);
  cat.save((error, menu) => {
    if (error) return res.status(400).json({ error });
    if (menu) {
      return res.status(200).json({ menu });
    }
  });
};

const getMenu = (req, res) => {
  Menu.find({}).exec((error, menu) => {
    if (error) return res.status(400).json({ error });
    const menuList = createCategories(menu);
    if (menu) res.status(200).json({ menuList });
  });
};

module.exports = {
  addMenu,
  getMenu,
}