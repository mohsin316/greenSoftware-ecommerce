const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyAdmin = async (req, res, next) => {
  const data = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: data.uid,
    },
  });
  if (!user.isAdmin) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = { verifyAdmin };
