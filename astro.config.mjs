import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare"


export default defineConfig({
    output: "server",
    adapter: cloudflare(),
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: { "@": "/src", },
        },
        define: {
            "process.env": process.env
        }
    },
});
