import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            caglisotro: ["Cagliostro", "sans-serif"],
            baloo: ["baloo2"],
            sofiaPro: ["sofiapro", "sans-serif"],
            openSans: ["pt sans", "sans-serif"],
         },
         colors: {
            prim1: "var(--bg-prim1)",
            prim2: "var(--bg-prim2)",
            seco1: "var(--bg-seco1)",
            seco2: "var(--bg-seco2)",
         },
         textColor: {
            prim1: "var(--text-prim1)",
            prim2: "var(--text-prim2)",
            extra1: "var(--extra1)",
            extra2: "var(--extra2)",
         },
         backgroundColor: {
            prim1: "var(--bg-prim1)",
            prim2: "var(--bg-prim2)",
            seco1: "var(--bg-seco1)",
            seco2: "var(--bg-seco2)",
            extra1: "var(--extra1)",
            extra2: "var(--extra2)",
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
      },
   },
   plugins: [],
};
export default config;
