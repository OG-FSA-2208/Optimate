//add all reducers here for cleaner store
// EXAMPLE: import { getUsers } from './adminReducer';

// export { getUsers };
import userSlice from './userSlice';
import matchesSlice from './matchesSlice';
import profileSlice from './profileSlice';
import messengerSlice from './messengerSlice';
import surveySlice from './surveySlice';

export { userSlice, matchesSlice, profileSlice, messengerSlice, surveySlice };
