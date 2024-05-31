import prisma from "../dbconnexion.js";
import bcrypt from "bcrypt";

export async function createapprenant(req, res) {
  const otherapprenant = await prisma.coach.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (otherapprenant) res.json("A user with this email already exists");
  const { password } = req.body;
  const cryptPassword = await bcrypt.hash(password, 10);
  req.body.password = cryptPassword;
  const apprenant = await prisma.apprenant.create({
    data: req.body,
  });
  res.json(apprenant);
}

export async function getapprenants(req, res) {
  try {
    let apprenants = await prisma.apprenant.findMany({
      select: {
        nom: true,
        email: true,
        telephone: true,
        codeCohorte: true,
        tagOrdinateur: true,
      },
    });
    if (req.user.role == "apprenant") {
      apprenants = apprenants.filter(
        (el) => el.codeCohorte == req.user.codeCohorte
      );
    }
    res.json(apprenants);
  } catch (error) {
    res.json({ error: error.stack });
  }
}

export async function updateapprenant(req, res) {
  try {
    const apprenant = await prisma.apprenant.findUnique({
      where: {
        matricule: req.body.matricule,
      },
    });
    if (!apprenant) {
      res.json("You are trying to update a apprenant that does not exist");
    }

    const otherapprenant = await prisma.apprenant.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (
      req.user.role == "apprenant" &&
      otherapprenant.email != req.user.email
    ) {
      res.json("This email is already taken by ");
    } else {
      if (req.user.role == "apprenant") {
        const updatedapprenant = await prisma.apprenant.update({
          where: { matricule: req.body.matricule },
          data: req.body,
        });
        res.json(updatedapprenant);
      } else {
        const updatedapprenant = await prisma.apprenant.update({
          where: { matricule: req.body.matricule },
          data: {
            nom: req.body.nom,
            email: req.body.email,
            telephone: req.body.telephone,
            codeCohorte: req.body.codeCohorte,
            tagOrdinateur: req.body.tagOrdinateur,
          },
        });
        res.json(updatedapprenant);
      }
    }
  } catch (error) {
    res.json({ error: error.stack });
  }
}

export async function deleteapprenant(req, res) {
  try {
    const apprenant = await prisma.apprenant.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!apprenant) {
      res.json("You are trying to delete a user that does not exist");
    }

    const deletedapprenant = await prisma.apprenant.delete({
      where: { email: req.body.email },
    });
    res.json(deletedapprenant);
  } catch (error) {
    res.json({ error: error.stack });
  }
}
