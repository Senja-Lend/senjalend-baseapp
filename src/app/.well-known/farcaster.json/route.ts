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
  const PROJECT_NAME =
    process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "senja";
  const APP_HERO_IMAGE = process.env.NEXT_PUBLIC_APP_HERO_IMAGE;
  const SPLASH_IMAGE = process.env.NEXT_PUBLIC_SPLASH_IMAGE;
  const SPLASH_BACKGROUND_COLOR =
    process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#000000";
  const FARCASTER_HEADER = process.env.FARCASTER_HEADER;
  const FARCASTER_PAYLOAD = process.env.FARCASTER_PAYLOAD;
  const FARCASTER_SIGNATURE = process.env.FARCASTER_SIGNATURE;

  return Response.json({
    accountAssociation: {
      header: FARCASTER_HEADER,
      payload: FARCASTER_PAYLOAD,
      signature: FARCASTER_SIGNATURE,
    },
    frame: {
      name: "Senja",
      version: "1",
      iconUrl: "https://senja-land.vercel.app/senja-logo.png",
      homeUrl: "https://senja-land.vercel.app",
      imageUrl: "https://senja-land.vercel.app/senja-logo.png",
      splashImageUrl: "https://senja-land.vercel.app/senja-logo.png",
      splashBackgroundColor: "#F87B1B",
      webhookUrl: "https://senja-land.vercel.app/api/webhook",
      subtitle: "Cross chain lending borrowing",
      description: "Crosschain Lending and Borrowing",
      primaryCategory: "finance",
      screenshotUrls: ["https://senja-land.vercel.app/senja-logo.png"],
      heroImageUrl: "https://senja-land.vercel.app/senja-logo.png",
      tagline: "Permisionless Crosschain",
      tags: ["finance"],
      buttonTitle: "open senja",
      ogTitle: "Senja - Crosschain Lending",
      ogDescription: "lend and borrow your assets any chain",
      ogImageUrl: "https://senja-land.vercel.app/senja-logo.png",
      noindex: false,
    },
    baseBuilder: {
      allowedAddresses: ["0xDCde6D1373e56a262DD06bf37572562D055d9888"],
    },
  });
}
