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
          width="12"
          height="50"
          viewBox="0 0 19 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_48_715)">
            <path
              d="M5.76219 51V25.176C5.76219 24.52 5.77819 23.776 5.81019 22.944C5.84219 22.112 5.97019 21.272 6.19419 20.424C6.43419 19.576 6.86619 18.808 7.49019 18.12C8.29019 17.224 9.15419 16.616 10.0822 16.296C11.0262 15.96 11.9382 15.784 12.8182 15.768C13.6982 15.736 14.4502 15.72 15.0742 15.72H18.2902V21H15.3142C14.2902 21 13.5302 21.264 13.0342 21.792C12.5382 22.304 12.2902 22.92 12.2902 23.64V51H5.76219ZM1.68219 30.12V25.08H18.2902V30.12H1.68219Z"
              fill="url(#paint0_linear_48_715)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_48_715"
              x1="5.52869"
              y1="33.6735"
              x2="19.5752"
              y2="34.0114"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7A5CFA" />
              <stop offset="0.9" stop-color="#C78BFF" />
            </linearGradient>
            <clipPath id="clip0_48_715">
              <rect width="19" height="66" fill="white" />
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
