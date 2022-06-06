import type { List, User } from "@prisma/client";
import { prisma } from "~/db.server";

export type { List } from "@prisma/client";

export async function getListsByUserId(id: User["id"]) {
  return prisma.list.findMany({ where: { userId: id } });
}

export async function getListById({
  id,
  userId,
}: Pick<List, "id"> & { userId: User["id"] }) {
  return prisma.list.findFirst({
    where: { id, userId },
  });
}

export async function createList({
  name,
  description,
  isPublic,
  allowComments,
  userId,
}: Pick<List, "name" | "description" | "allowComments" | "isPublic"> & {
  userId: User["id"];
}) {
  return prisma.list.create({
    data: {
      name,
      description,
      isPublic,
      allowComments,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function deleteNote({
  id,
  userId,
}: Pick<List, "id"> & { userId: User["id"] }) {
  return prisma.list.deleteMany({
    where: { id, userId },
  });
}
