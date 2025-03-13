// next.config.js

const nextConfig = {
  rewrites: () => {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },

  images: {
    domains: ['raw.githubusercontent.com'], // Adicionando o domínio de imagens externas
  },
};

export default nextConfig;
