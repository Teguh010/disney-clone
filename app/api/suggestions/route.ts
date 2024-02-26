export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  console.log("HIT API >>>");

  const res = await fetch(
    `https://disney2clone.azurewebsites.net/api/getaisuggestionyoutube?term=${term}`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    }
  );

  const message = await res.text();

  console.log("DEBUG >>>", message);

  return Response.json({ message });
}
