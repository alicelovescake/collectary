import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createList } from "~/models/list.server";
import { requireUserId } from "~/session.server";
import { useEffect, useRef } from "react";
import { useActionData, Form } from "@remix-run/react";

type ActionData = {
  errors?: {
    name?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description") as string;
  const isPublic = formData.get("isPublic") as string;
  const allowComments = formData.get("allowComments") as string;

  if (typeof name !== "string" || !name.length) {
    return json<ActionData>(
      { errors: { name: "Name is required" } },
      { status: 400 }
    );
  }

  const list = await createList({
    name,
    description,
    isPublic: Boolean(isPublic),
    allowComments: Boolean(allowComments),
    userId,
  });

  return redirect(`/lists/${list.id}`);
};

export default function NewListPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input
            ref={nameRef}
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-name" : undefined
            }
          />
        </label>
        {actionData?.errors?.name && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.name}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Description: </span>
          <textarea
            name="description"
            rows={3}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="justify-left flex ">
        <label className="mr-16 inline-block text-gray-800">Public:</label>
        <input
          type="checkbox"
          role="switch"
          name="isPublic"
          className="float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-green-500 bg-contain bg-no-repeat align-top shadow-sm transition-all duration-300 ease-in-out focus:outline-none"
        />
      </div>

      <div className="justify-left flex ">
        <label className="mr-16 inline-block text-gray-800">Comments:</label>
        <input
          type="checkbox"
          role="switch"
          name="allowComments"
          className="float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-green-500 bg-contain bg-no-repeat align-top shadow-sm transition-all duration-300 ease-in-out focus:outline-none"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
