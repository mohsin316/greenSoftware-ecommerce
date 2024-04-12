const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { supabase } = require("../config/supabaseCreateClient");

// signup the user
const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Username and password are required." }); //bad request
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!data.user) {
      console.log({ error: error.status });

      throw new Error(error);
    }
    const user = await prisma.user.create({
      data: {
        id: data.user.id,
        email,
        username,
      },
    });
    res.cookie("jwt", data.session.refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken: data.session.access_token,
      user: { isAdmin: user.isAdmin, id: user.id, username: user.username },
    });
  } catch (error) {
    res.status(409).json({ error: error }); //conflict
  }
};

// login the user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." }); //bad request
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!data.user) {
      console.log({ error });
      throw new Error(error.message);
    }
    res.cookie("jwt", data.session.refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const user = await prisma.user.findUnique({
      where: {
        id: data.user.id,
      },
    });
    res.json({
      accessToken: data.session.access_token,
      user: { isAdmin: user.isAdmin, id: user.id, username: user.username },
    });
  } catch (error) {
    console.log(error.errorCode);
    res.status(401).json({ error: error.message }); //unauthorized
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { signUp, login, logout };
