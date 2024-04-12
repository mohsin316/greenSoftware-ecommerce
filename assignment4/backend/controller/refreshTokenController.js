const { supabase } = require("../config/supabaseCreateClient");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401); //unauthorized
  }
  const refresh_token = cookies.jwt;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) {
    return res.sendStatus(403); //forbidden
  }

  const { session } = data;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return res.sendStatus(403);
  }

  res.status(200).json({
    accessToken: session.access_token,
    user: { isAdmin: user.isAdmin, id: user.id, username: user.username },
  });
};

module.exports = { handleRefreshToken };
