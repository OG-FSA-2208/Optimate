import { useState } from 'react';

export default function UserPhoto({imgData, userData, setUserData}) {
    // imgData should contain both the index and URL of the image
    const handleDeletePhoto = () => {
        let tempPhotos = userData.user_photos; // this SHOULD be an array
        tempPhotos.splice(imgData.index, 1);   // this should remove the img from the array
        setUserData({...userData, user_photos: tempPhotos});

        // OR...
        // setUserData({...userData, user_photos: [...userData.user_photos].splice(imgData.index, 1)})
    }

    return (
        <div className='user_photo'>
            <button onClick={handleDeletePhoto}>X</button>
            <img src={imgData.imgURL} alt="image from user's profile data"/>
        </div>
    )
}