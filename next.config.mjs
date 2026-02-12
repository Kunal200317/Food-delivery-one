/** @type {import('next').NextConfig} */
const nextConfig = {
    //resive image from the google gamil authentication 
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com', //for google images
          },
          {
            protocol: 'https',
            hostname: 'food-ordering-by-kunal.s3.amazonaws.com', // for AWS S3 images
          }
        ],
      },
};

export default nextConfig;
