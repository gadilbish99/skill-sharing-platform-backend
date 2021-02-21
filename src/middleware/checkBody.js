const checkBody = (req, res, next) => {
  const fields = ["firstName", "lastName", "email", "password"];
  try {
    const bodyFields = Object.keys(req.body);
    if (bodyFields.every(bodyField => fields.includes(bodyField)) && fields.length === bodyFields.length)
        next();
    else 
        throw new Error('Wrong Fields, Don\'t do it again. I warn you.');
  } catch (err) {
    res.status(400).send({
      error: `${err.message}`,
    });
  }
};

module.exports = checkBody