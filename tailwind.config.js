/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Optimize for production builds
  corePlugins: {
    // Disable unused Tailwind features to reduce CSS size
    preflight: true,
  },
  // Enable purging in production
  safelist: [
    // Add any classes that might be dynamically generated
    'animate-spin',
    'bg-red-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-orange-600',
    'text-red-600',
    'text-green-600',
    'text-blue-600',
    'text-orange-600',
  ],
};
