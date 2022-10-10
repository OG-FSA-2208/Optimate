import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';

// component of UserProfile meant to ONLY VIEW their info, not editing
export default function ViewUserProfile() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // object that contains all of the user's profile info
    const userData = useSelector((state) => state.profile);

    useEffect(() => {
        // dispatching so that userData can grab the profile of the current user
        dispatch(getLoggedInUser());
        setLoading(false);
    }, [dispatch]);

    return (
        <div>
            {loading ? <></> : 
            <>{userData.firstname} {userData.lastname}, {userData.age}, {userData.gender}, and so on</>
            }
            <div>
                <button
                className="button block"
                onClick={() => dispatch(logoutUser(Router))}
                >
                Sign Out
                </button>
            </div>
        </div>
    )
}