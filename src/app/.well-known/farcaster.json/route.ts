/* eslint-disable @typescript-eslint/no-unused-vars */
function withValidProperties(
  properties: Record<string, undefined | string | string[]>
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    })
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    accountAssociation: {
      header:
        "eyJmaWQiOjEzMTg0NDcsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg1MzFGYURDMkMyQWI1ZDE4QzliMDdDNThlZjI3MUVBM2I4OGE2Zjg5In0",
      payload: "eyJkb21haW4iOiJzZW5qYS1maS52ZXJjZWwuYXBwIn0",
      signature:
        "dVrejLBi33DHSrjSSUk4ymSuu/d9L3+6H/jBSENShTJprpxWe60HVjY+32w+22ye3eO6lgqoMrOGh7NnoElZaRs=",
    },
    frame: {
      name: "senja",
      homeUrl: "https://senja-fi.vercel.app",
      iconUrl: "https://senja-fi.vercel.app/senja-logo.png",
      version: "1",
      imageUrl: "https://senja-fi.vercel.app/senja-logo.png",
      subtitle: "senja",
      webhookUrl: "https://senja-fi.vercel.app/api/webhook",
      description: "senja",
      splashImageUrl: "https://senja-fi.vercel.app/senja-logo.png",
      primaryCategory: "finance",
      splashBackgroundColor: "#000000",
    },

    baseBuilder: {
      allowedAddresses: ["0xDCde6D1373e56a262DD06bf37572562D055d9888"],
    },
  });
}
