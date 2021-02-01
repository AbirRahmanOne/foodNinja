const Menu = require("../models/menu");

// creating categories for menu
const createCategories = (categories, parentId = null) => {
    const categoryArray = [];
    let category;
    if (parentId == null) {
      category = categories.filter((val) => val.parentId == undefined);
    } else {
      category = categories.filter((val) => cat.parentId == parentId);
    }
  
    for (const x in category) {
      categoryArray.push({
        _id: x._id,
        name: x.name,
        children: createCategories(categories, x._id),
      });
    }
  
    return categoryArray;
  };

  module.exports = createCategories ;