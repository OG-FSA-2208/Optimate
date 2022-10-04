# Capstone Planning

## Contract

### Work Contract

- work hours 10am-6pm
  - Lunch break 1pm-230pm
- Daily Check-ins in the morning and afternoon
  - Morning, after 2:30, and occasionally at EOB
- 24hr notice if possible if you are not available
- Notify if unable to complete your section

### Github work flow

- Send a new message if you have completed the merge
- React to that message to show you have pulled the new main branch
- Do NOT push to main branch
- Push to branch named by the feature you are working on
  - Send a message when you have a branch that is ready for a merge
  - React to the message if you are reviewing the repo
    - Git checkout main
    - Git pull origin main
    - Git checkout `branch name`
    - Git merge origin main `:wq in terminal if presented with commit message for merge`
- Add issue to the project board or assign your self an issue if not taken

### Pair Programming: When is it necessary?

- When our features overlap
- Integrating features or components with complex logic
- If there is a known dependency on another's work
- Use place holder names that are descriptive and comments

### Social Contracts

- Feature diagreements: majority vote
- Disagreements/problems between members
  - Acknowledge the issue so it can be explored while staying respectful to each other
  - If unable to resolve loop in another member to mediate
  - If problem persists, escalate to mentor

## PROJECT IDEA

- Names:
  - Optimate
    - bot: OPTI
    - logo: octopus 🐙
   
> OPTIMATE (DATING APP)
> “Not a booty call, a foodie call"

- 1. CREATE AN ACCOUNT (INITIAL SIGN UP)
SURVEY 
Personal Info
- age
- gender
- occupation
- single/married??? get out! you are banned/divorced
- smoker/nonsmoker + drinker/sober?
- priorities
- interests (5 max.)
- location
- preferences for partner: age, gender, occupation, marital status
- love languages —  is this important to you? 
  if yes, create our own quiz (5 questions?) if user does not know their LL


2. MATCHING LOVERS
- based on score of interests
- based on their age input, age range will be x amount of years older or younger
- based on priorities  


3. MESSENGER/CHAT BOX
- bot suggestions after a week?


4. RESOURCES PAGE:
- OPTI-THE-OCTOPUS BOT - have trouble dating????? no worries, we got you.
- What if he/she ghosts?
- What if he/she is busy? What should I do —medium article
- How to time manage now with dating?


## WireFrame

### Front End

- React
  - Components
    - User Sign Up View
    - User Log In View
    - User Profile / Edit Profile Info
    - List of Potential Matches (Links to each individual match)
    - List of Connected Matches (Links to each individual message box)
    - Videochat / Voice chat (maybe)
  - Routing
    - User (many-to-many association when users match)
        - Edit user profile or view user profile on same page
    - Tags (for interests)
    - @Redux Toolkit
- LESS

### Middleware/features


### Back

- Models
  - User
    - username/first name/last name/age/occupation/smoking/drinking/lovelanguages
    - password
  - Interest
    - category/tag

- FireBase?
  - Relational
    - firestore
    - superbase / other dbmodels?
  - Built in websockets?
  - Automatic authentication? - oauth
  - Google signin?

**
TO DO LIST:
- look into Firebase
- Wireframes
**
