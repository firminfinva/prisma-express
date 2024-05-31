import prisma from "../dbconnexion.js";

export async function createordinateur(req, res) {
  const ordinateur = await prisma.ordinateur.create({
    data: req.body,
  });
  res.json(ordinateur);
}

export async function getordinateurs(req, res) {
  const ordinateurs = await prisma.ordinateur.findMany();
  res.json(ordinateurs);
}

export function updateordinateur(req, res) {
  res.json("You have updated a ordinateur");
}

export async function deleteordinateur(req, res) {
  const deletedordinateur = await prisma.ordinateur.delete({
    where: { tag: req.body.tag },
  });
  res.json(deletedordinateur);
}
