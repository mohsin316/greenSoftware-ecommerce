const { supabase } = require("../config/supabaseCreateClient");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); // unauthorized
  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    return res.sendStatus(403); //forbidden i.e invalid token
  }
  next();
};

module.exports = { verifyJWT };
