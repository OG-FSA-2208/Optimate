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
  - Busybee 😂
  - Errand Expert
    - logo: EE
  - On The Go
  - Just In Time
  - Get Clocked
    - logo: 🥊⏰
  - Codys Clock ⏰
  - Optimate
    - bot: Optim
    - logo: octopus 🐙:octopus:
    - :purple_heart:

> Optimal Time Scheduling (Helps user schedule their errands based on optimal time)

- Create an account
- Add a task > query data to return best time to go
  - Reschedule
  - Limit possible time suggestions
  - Suggestions for other locations?
    - Transportation type?
- All task view list style
  - Filter options based on ENUM
  - Upcoming tasks
  - Full list
  - Completed
  - Incomplete
  - Conflicts: based on time
- Task view calendar
  - Contains all tasks including timing
    - integration with windows calendar/google calendar
- Individual task view
  - Modify task
  - Mark complete & reverse
  - Repeat or readd old task

## WireFrame

### Front End

- React
  - Components
    - Calender
    - class or id name on all components
  - Routing
    - User
    - Admin
    - @Redux Toolkit
- LESS

### Middleware/features

- Google API
  - [premade api BESTTIME](https://besttime.app/#api)
  - curl to pull google data?
  - [google distance matrix](https://developers.google.com/maps/documentation/distance-matrix/)
- car traffic api?
  - other layers

### Back

- Models
  - User
    - username/email/fn/ln
    - password
  - TaskList
    - Category/Tag
      - Event / Errand / Appointment
      - priority level/taskorder?
    - locations
    - task name
    - time/date
    - details
    - ENUN: Complete / Archived / Inprogess
- FireBase?
  - Relational
    - firestore
    - superbase / other dbmodels?
  - Built in websockets?
  - Automatic authentication? - oauth
  - Google signin?
