import prisma from "../dbconnexion.js";

export async function createcohorte(req, res) {
  const cohorte = await prisma.cohorte.create({ data: req.body });
  res.json(cohorte);
}

export async function getcohortes(req, res) {
  const cohortes = await prisma.cohorte.findMany();
  res.json(cohortes);
}

export async function updatecohorte(req, res) {
  const updatedcohorte = await prisma.cohorte.update({
    where: { code: req.body.code },
    data: { sessionId: req.body.sessionId, description: req.body.description },
  });
  res.json(updatedcohorte);
}

export async function deletecohorte(req, res) {
  const deletedcohorte = await prisma.cohorte.delete({
    where: { code: req.body.code },
  });
  res.json(deletedcohorte);
}
