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

export async function updateordinateur(req, res) {
  const updatedOrdonateur = await prisma.ordinateur.update({
    where: { id: req.body.id },
    data: req.body,
  });
  res.json(updatedOrdonateur);
}

export async function deleteordinateur(req, res) {
  const deletedordinateur = await prisma.ordinateur.delete({
    where: { tag: req.body.tag },
  });
  res.json(deletedordinateur);
}
