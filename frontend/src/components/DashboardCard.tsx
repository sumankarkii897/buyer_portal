import React from "react";


const DashboardCard = ({
   
  number,
  title,
}: {
  number: number;
  title: string;
 
}) => {
  return (
    <div className="container border-2 h-28 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
       
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-3xl font-bold">{number}</p>
    </div>
  );
};

export default DashboardCard;