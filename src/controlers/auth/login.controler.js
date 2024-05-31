import prisma from "../../dbconnexion.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).json({ error: "Some fileds are required" });
    }

    const coach = await prisma.coach.findUnique({
      where: {
        email: email,
      },
    });

    const apprenant = await prisma.apprenant.findUnique({
      where: {
        email: email,
      },
    });
    let theuser = null;
    if (coach) theuser = coach;
    else if (apprenant) theuser = apprenant;
    else {
      res.status(404).json({ error: "There is not user with these IDs" });
    }

    const isAuth = await bcrypt.compare(password, theuser.password);

    if (isAuth) {
      if (coach) {
        theuser.role = "coach";
      } else if (apprenant) {
        theuser.role = "apprenant";
      }
      const token = jwt.sign(
        {
          matricule: theuser.matricule,
          nom: theuser.nom,
          email: theuser.email,
          codeCohorte: theuser.codeCohorte,
          adresse: theuser.adresse,
          telephone: theuser.telephone,
          role: theuser.role,
        },
        "JSON_WEB_TOKEN",
        {
          expiresIn: "72000h",
        }
      );
      res.json(token);
    } else {
      res.status(403).json({ error: "Wrong Password" });
    }
  } catch (error) {
    res.json({ error: error.stack });
  }
}
