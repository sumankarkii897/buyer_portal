import React, { use, useEffect } from 'react'
import { IoIosHeart } from "react-icons/io";
// import { CiHeart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import api from '../services/api';
import { toast } from 'react-toastify';
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
// function Card({ property, isDeleteBtnRequired, isFavouriteItem }: { property: Property, isDeleteBtnRequired?: boolean, isFavouriteItem?: boolean }) {
// const [isFavourite, setIsFavourite] = React.useState(false);
// const [isDeleted, setIsDeleted] = React.useState(false);
//   const toggleFavourite = () => {
//     setIsFavourite(!isFavourite);
//   }
//   const toggleDelete = () => {
//     setIsDeleted(!isDeleted);
//   }
//   const deleteFavourite = async () => {
//     try {
//       confirm("Are you sure you want to remove this property from your favourites ?") && await api.delete(`/favourite/${property._id}`)
      
//     } catch (error : any) {
//       const errorMessage = error.response?.data?.message || error.message || "Failed to remove property from favourites"
//       console.error(errorMessage)
//       toast.error(errorMessage)
//     }
//   }
//   const addFavourite = async () => {
//     try {
//       await api.post(`/favourite/${property._id}`)
//     } catch (error : any) {
//       const errorMessage = error.response?.data?.message || error.message || "Failed to add property to favourites"
//       console.error(errorMessage)
//       toast.error(errorMessage)
//     }
//   }
 
//   return (
//   <>
//   <div className="m-4 md:m-14 flex items-center justify-center flex-col">
//          <div className="flex items-start justify-start flex-col mt-4  font-semibold gap-4 p-4 rounded-lg   border border-gray-300">
//             <img src={property.image.url} alt={property.title} className="w-full h-40 object-cover rounded-md" />
//             <h2 className="text-xl font-bold">{property.title}</h2>
//             <p className="text-gray-600">{property.description}</p>
//             <p className="text-lg font-semibold">Price: ${property.price}</p>
//             <p className="text-gray-600">Location: {property.location}</p>
//             {/* <p className="text-gray-600">Seller: {property.seller}</p> */}
//             <div className="flex items-center justify-end gap-8 w-full">
//               <button className="rounded-md " onClick={() => {
//                 toggleFavourite();
//                 if (!isFavourite) {
//                   addFavourite();
//                 } else {                  deleteFavourite();
//                 }

//                 }}>
//             <IoIosHeart
//     className={
//       isFavouriteItem
//         ? "text-red-500" 
//         : isFavourite
//         ? "text-red-500" 
//         : "text-gray-400" 
//     }
//     size={24}
//   />
             
//             </button>
            
//             {
//               isDeleteBtnRequired && (
//                 <button className="" onClick={() => {
//                   toggleDelete();
//                   deleteFavourite();
//                 }}>
//                  <FaRegTrashAlt className={isDeleted ? "text-red-500" : ""} />
//                 </button>
//               )
//             }
//             </div>
//             </div>

//             </div>
//   </>
//   )
// }
function Card({
  property,
  isDeleteBtnRequired,
  isFavouriteItem,
  onDelete,       
  onFavouriteToggle, 
}: {
  property: Property;
  isDeleteBtnRequired?: boolean;
  isFavouriteItem?: boolean;
  onDelete?: () => void;
  onFavouriteToggle?: (newValue: boolean) => void;
}) {
  const [isFavourite, setIsFavourite] = React.useState(false);

  const handleFavouriteClick = async () => {
    if (isFavouriteItem) return; 

    const newValue = !isFavourite;
    setIsFavourite(newValue);

    try {
      if (newValue) {
        const res =await api.post(`/favourite/${property._id}`);
        toast.success(res.data.message || "Property added to favourites.");
      } else {
        await api.delete(`/favourite/${property._id}`);
        toast.success("Property removed from favourites.");
      }

      onFavouriteToggle?.(newValue);  
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Favourite action failed";
      console.error(message);
      toast.error(message);
      setIsFavourite(!newValue); 
    }
  };

  const handleDeleteClick = async () => {
    if (!confirm("Are you sure you want to remove this property from your favourites?")) return;

    try {
      await api.delete(`/favourite/${property._id}`);
      toast.success("Property removed from favourites.");
      onDelete?.(); 
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Delete failed";
      console.error(message);
      toast.error(message);
    }
  };

  return (
    <div className="m-4 md:m-14 flex flex-col items-center justify-center">
      <div className="flex flex-col mt-4 font-semibold gap-4 p-4 rounded-lg border border-gray-300">
        <img
          src={property.image.url}
          alt={property.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h2 className="text-xl font-bold">{property.title}</h2>
        <p className="text-gray-600">{property.description}</p>
        <p className="text-lg font-semibold">Price: ${property.price}</p>
        <p className="text-gray-600">Location: {property.location}</p>

        <div className="flex justify-end gap-8 w-full">
          <button onClick={handleFavouriteClick}>
            <IoIosHeart
              className={
                isFavouriteItem || isFavourite ? "text-red-500" : "text-gray-400"
              }
              size={24}
            />
          </button>

          {isDeleteBtnRequired && (
            <button onClick={handleDeleteClick}>
              <FaRegTrashAlt className="text-gray-400" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
