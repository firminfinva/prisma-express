import prisma from "../dbconnexion.js";

export async function createsession(req, res) {
  const session = await prisma.session.create({ data: req.body });
  res.json(session);
}
export async function getsessions(req, res) {
  const sessions = await prisma.session.findMany();
  res.json(sessions);
}

export async function updatesession(req, res) {
  const updatedsession = await prisma.session.update({
    where: { id: req.body.id },
    data: { annee: req.body.annee, ville: req.body.ville },
  });
  res.json(updatedsession);
}

export async function deletesession(req, res) {
  const deletedsession = await prisma.session.delete({
    where: { id: req.body.id },
  });
  res.json(deletedsession);
}
