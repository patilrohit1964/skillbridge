import React from "react";
export const metadata = {
  title: "Next App",
  description: "Built with next.js app router",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default layout;
