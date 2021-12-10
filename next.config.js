/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MONGODB_URI:
      "mongodb+srv://locloc408:loc1792001@cluster0.mursv.mongodb.net/FacebookClone?retryWrites=true&w=majority",
    NEXT_PUBLIC_BASE_URI: "http://localhost:3000/api",
  },
};
