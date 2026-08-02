import { comments } from "../data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const particularComment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );
  if (!particularComment) return new Response("This id doesnt exists");

  return Response.json(particularComment);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const { text } = body;

  const commentInd = comments.findIndex((conmment) => conmment.id === parseInt(params.id))
  comments[commentInd].text = text;

  return Response.json(comments[commentInd]);

}
