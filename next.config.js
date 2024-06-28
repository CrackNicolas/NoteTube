/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.icon-icons.com'
            }
        ]
    },
    env: {
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/",
        ROL_ADMIN_USER_ID: process.env.ROL_ADMIN_USER_ID,
        DEVELOPMENT_DOMAIN:
            process.env.NODE_ENV === 'development' ?
                'http://localhost:3000'
                :
                'https://notes-aplication.vercel.app',
    }
}

module.exports = nextConfig
