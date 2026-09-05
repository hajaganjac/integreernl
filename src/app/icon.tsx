import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the IntegreerNL tulip mark, generated at build time. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B2A4A",
          borderRadius: 7,
        }}
      >
        <svg width="22" height="24" viewBox="0 0 100 120" fill="none">
          <path
            d="M50 74C50 74 47 92 51 104C53 110 49 113 46 116"
            stroke="#2E6F6E"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="M50 70C40 70 15 64 12 40C10 24 20 10 36 8C44 7 49 14 50 24Z" fill="#D8551F" />
          <path d="M50 70C60 70 85 64 88 40C90 24 80 10 64 8C56 7 51 14 50 24Z" fill="#D8551F" />
          <path
            d="M50 74C38 74 30 58 30 40C30 20 39 6 50 6C61 6 70 20 70 40C70 58 62 74 50 74Z"
            fill="#EF6C3A"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
