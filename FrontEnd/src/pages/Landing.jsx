import React from "react";
import {
  About,
  Footer,
  Hero,
  SayAboutUs,
  TopRated,
  WhatWeDo,
} from "../components";

const Landing = () => {
  return (
    <>
      <Hero />
      <TopRated />
      <WhatWeDo />
      <About />
      <SayAboutUs />
      <Footer />
    </>
  );
};

export default Landing;
