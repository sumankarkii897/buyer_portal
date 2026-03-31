import React, { useEffect, useState } from 'react'
import api from '../services/api'
import Card from '../components/Card'
export interface FavouriteResponse {
  success: boolean
  message: string
  favourites: Favourite[]
}

export interface Favourite {
  _id: string
  user: string
  property: Property
  createdAt: string
  updatedAt: string
  __v: number
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

export const Favourite = () => {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const res = await api.get<FavouriteResponse>("/favourite/")
                setFavourites(res.data.favourites)
                console.log("Favourites : ", res.data.favourites)
            }
            catch (error) {
                console.error("Error fetching favourites : ", error)
            }
        }
        fetchFavourites();
    }, [])
  return (
   <>
   <h2 className='font-semibold text-center mt-2 text-xl'>My Favourite Properties</h2>
<div className="container  p-4 h-80vh flex  items-center justify-center">
      {
        favourites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {favourites.map((favourite) => (
                    <Card key={favourite._id} property={favourite.property} isDeleteBtnRequired={true} isFavouriteItem={true}
                    onDelete={() =>
    setFavourites((prev) => prev.filter((f) => f._id !== favourite._id))
  }

                    
                    />
                ))}
            </div>
        ) : (
            <p>No favourite properties found.</p>
        )
      }
    </div>

   </>
  )
}
