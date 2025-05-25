import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 24,
  height: 24,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_103_530)">
            <path
              d="M10.1311 21V8.088C10.1311 7.76 10.1391 7.388 10.1551 6.972C10.1711 6.556 10.2351 6.136 10.3471 5.712C10.4671 5.288 10.6831 4.904 10.9951 4.56C11.3951 4.112 11.8271 3.808 12.2911 3.648C12.7631 3.48 13.2191 3.392 13.6591 3.384C14.0991 3.368 14.4751 3.36 14.7871 3.36H16.3951V6H14.9071C14.3951 6 14.0151 6.132 13.7671 6.396C13.5191 6.652 13.3951 6.96 13.3951 7.32V21H10.1311ZM8.09109 10.56V8.04H16.3951V10.56H8.09109Z"
              fill="url(#paint0_linear_103_530)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_103_530"
              x1="6.98361"
              y1="12.2449"
              x2="24.6137"
              y2="13.7184"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7A5CFA" />
              <stop offset="0.9" stop-color="#C78BFF" />
            </linearGradient>
            <clipPath id="clip0_103_530">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
