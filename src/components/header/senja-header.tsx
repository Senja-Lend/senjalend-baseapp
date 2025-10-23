import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "../ui/card";

const SenjaHeader = () => {
  return (
    <Card className="fixed top-0 left-0 right-0 z-50 max-w-xl mx-auto p-1 rounded-t-none bg-white/30 backdrop-blur-xl  border border-white/20 shadow-xl mb-2">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent "></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFF3E0]/20 to-transparent "></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 justify-between">
          <Image
            src="/senja-logo.png"
            alt="Senja Logo"
            width={50}
            height={50}
            className="border-2 mt-1 border-white/40 rounded-full shadow-md"
          />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SenjaHeader;
