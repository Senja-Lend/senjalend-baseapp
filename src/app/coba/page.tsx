"use client";
import React from "react";
import { useReadUserCollateral } from "@/hooks/read/useReadUserCollateral";

const Page = () => {
  const { 
    userCollateralFormatted, 
    userCollateralLoading, 
    userCollateralError 
  } = useReadUserCollateral(
    "0xbaa42abcdedfbe7583c6416a145d68d4bd6bded3",
    18
  );
  
  console.log("collateralData", userCollateralFormatted);
  console.log("loading", userCollateralLoading);
  console.log("error", userCollateralError);
  
  if (userCollateralLoading) {
    return <div>Loading collateral data...</div>;
  }
  
  if (userCollateralError) {
    return <div>Error: {userCollateralError.message}</div>;
  }
  
  return (
    <div>
      <h1>User Collateral Test</h1>
      <p>Collateral Amount: {userCollateralFormatted}</p>
    </div>
  );
};

export default Page;
