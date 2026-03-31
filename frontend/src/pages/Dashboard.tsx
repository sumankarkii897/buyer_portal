
import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import { Favourite } from "./Favourite";





export const Dashboard = () => {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [totalFavourites, setTotalFavourites] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesRes = await api.get("/property");
        const favouritesRes = await api.get("/favourite")
        setTotalProperties(propertiesRes.data.properties.length);
        setTotalFavourites(favouritesRes.data.favourites.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        

        <DashboardCard

          number={totalProperties}
          title="Total Properties"
        />
        <DashboardCard
    
          number={totalFavourites}
          title="Total Favourites"
        />  
      </div>

     <div className="container  p-4 h-80vh ">
       <Favourite />
     </div>
    </div>
  );
};

