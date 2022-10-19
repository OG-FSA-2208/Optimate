import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'

export default function UserPhoto({imgData, userData, setUserData, onView}) {
    // imgData should contain both the index and URL of the image
    const handleDeletePhoto = () => {
        let tempPhotos = [...userData.user_photos]; // this SHOULD be an array
        tempPhotos.splice(imgData.index, 1);   // this should remove the img from the array
        setUserData({...userData, user_photos: tempPhotos});
    }

    return (
        <div className='user_photo'>
            {onView ? <></> : <button onClick={handleDeletePhoto}><DeleteIcon/></button>}
            <img src={imgData.imgURL} alt="image from user's profile data"/>
        </div>
    )
}