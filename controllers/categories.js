const Category = require("../models/Category");

//@desc      Get categories
//@route     GET /api/v1/categories
//@access    Private/Admin
exports.getCategories = async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({ success: true, data: categories });
};

//@desc      Get category
//@route     GET /api/v1/categories/:id
//@access    Private/Admin
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).json({
        success: true,
        error: `No Category with that id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//@desc      Create Category
//@route     POST /api/v1/categories
//@access    Private/Admin
exports.createCategories = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//@desc      Update Category
//@route     PUT /api/v1/categories/:id
//@access    Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!category) {
      return res.status(400).json({
        success: true,
        error: `No Category with that id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

//@desc      DELETE category
//@route     DELETE /api/v1/categories/:id
//@access    Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).json({
        success: true,
        error: `No Category with that id of ${req.params.id}`,
      });
    }

    await category.remove();

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
