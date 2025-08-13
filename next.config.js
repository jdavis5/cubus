import createJiti from 'jiti'

const jiti = createJiti(new URL(import.meta.url).pathname)

jiti('./env/server')
jiti('./env/client')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        outputFileTracingIncludes: {
            '/api/**/spec': ['./src/public-api/**/*']
        }
    }
}

export default nextConfig
