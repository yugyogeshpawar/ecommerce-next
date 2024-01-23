// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Setting from "components/Setting";
// import Footer from "pages-sections/landing/Footer";
// import Section1 from "pages-sections/landing/Section1";
// import Section2 from "pages-sections/landing/Section2";
// import Section3 from "pages-sections/landing/Section3";
// import Section4 from "pages-sections/landing/Section4";
// import Section6 from "pages-sections/landing/Section6";
// import Section5 from "pages-sections/landing/Section5";
// const IndexPage = () => {
//   const [filterDemo, setFilterDemo] = useState("");
//   return (
//     <Box id="top" overflow="hidden" bgcolor="background.paper">
//       <Section1 />
//       <Section6 setFilterDemo={setFilterDemo} />
//       <Section2 />
//       <Section5 />
//       <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
//       <Section4 />
//       <Footer />
//       <Setting />
//     </Box>
//   );
// };
// export default IndexPage;



// pages/index.js
import { useEffect } from 'react';

const IndexPage = () => {
  useEffect(() => {
    // Redirect to the desired URL
    window.location.replace('/furniture-shop');
  }, []);

  // This component won't be rendered due to the redirect
  return <div>Redirecting...</div>;
};

export const getServerSideProps = async ({ res }) => {
  // Set up server-side redirect
  res.writeHead(302, { Location: '/furniture-shop' });
  res.end();

  return { props: {} };
};

export default IndexPage;
