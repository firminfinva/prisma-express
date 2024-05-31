import prisma from "../dbconnexion.js";
import bcrypt from "bcrypt";

export async function createcoach(req, res) {
  const othercoach = await prisma.coach.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (othercoach) res.json("A coach with this email already exists");
  const { password } = req.body;
  const cryptPassword = await bcrypt.hash(password, 10);
  req.body.password = cryptPassword;
  const coach = await prisma.coach.create({ data: req.body });
  res.json(coach);
}

export async function getcoachs(req, res) {
  const coachs = await prisma.coach.findMany({
    select: {
      nom: true,
      email: true,
      telephone: true,
      codeCohorte: true,
    },
  });
  res.json(coachs);
}

export async function updatecoach(req, res) {
  try {
    const coach = await prisma.coach.findUnique({
      where: {
        matricule: req.body.matricule,
      },
    });
    if (!coach) {
      res.json("You are trying to update a coach that does not exist");
    }

    const othercoach = await prisma.coach.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (othercoach && req.user.email != coach.email) {
      res.json("you can not update this user");
    } else {
      const updatedcoach = await prisma.coach.update({
        where: { matricule: req.body.matricule },
        data: req.body,
      });
      res.json(updatedcoach);
    }
  } catch (error) {
    res.json({ error: error.stack });
  }
}

export async function deletecoach(req, res) {
  try {
    const coach = await prisma.coach.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!coach) {
      res.json("You are trying to delete a user that does not exist");
    }
    if (coach.email == req.user.email) {
      const deletedcoach = await prisma.coach.delete({
        where: { email: req.body.email },
      });
      res.json(deletedcoach);
    } else {
      res.json("You can't delete this user");
    }
  } catch (error) {
    res.json({ error: error.stack });
  }
}
