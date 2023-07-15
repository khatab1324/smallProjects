const { validationResult } = require("express-validator");
module.exports = {
  handleErrors(templateFunc, productDataCallBack) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = {};
        if (productDataCallBack) {
          data = await productDataCallBack(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
};
