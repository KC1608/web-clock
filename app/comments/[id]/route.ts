import { comments } from "../data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const particularComment = comments.find(
    (comment) => comment.id === parseInt(id)
  );
  if (!particularComment) return new Response("This id doesnt exist", { status: 404 });

  return Response.json(particularComment);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { text } = body;

  const commentInd = comments.findIndex((comment) => comment.id === parseInt(id));
  if (commentInd === -1) return new Response("Comment not found", { status: 404 });

  comments[commentInd].text = text;

  return Response.json(comments[commentInd]);
}
