Technologies Used
🔹 Frontend
React.js
Tailwind CSS
Axios

🎨 Tailwind CSS Setup

To install and configure Tailwind CSS in the React frontend:

npm install -D tailwindcss@3.4.1
npx tailwindcss init -p
Configuration

tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;