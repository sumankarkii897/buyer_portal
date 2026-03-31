import React, { useEffect, useState } from 'react'
import api from '../services/api'
import Card from '../components/Card'
export interface PropertyResponse {
  success: boolean
  message: string
  properties: Property[]
}

export interface Property {
  image: Image
  _id: string
  title: string
  description: string
  price: number
  location: string
  seller: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Image {
  public_id: string
  url: string
}

export const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get<PropertyResponse>("/property/")
        setProperties(res.data.properties)
        console.log("Properties : ", res.data.properties)
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  },[])
  return (
    <div className="container  p-4 h-80vh flex  items-center justify-center">
      {
        properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
             <Card key={property._id} property={property}  />
            ))}
          </div>
        ) : (
          <p>No properties available.</p>
        )
      }
    </div>
  )
}

