import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getListById, List, deleteNote } from "~/models/list.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  list: List;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.listId, "list id not found");

  const list = await getListById({ userId, id: params.listId });

  if (!list) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ list });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.listId, "list id not found");

  await deleteNote({ userId, id: params.listId });

  return redirect("/lists");
};

export default function ListDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.list.name}</h3>
      <p className="py-6">{data.list.description}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>List not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
