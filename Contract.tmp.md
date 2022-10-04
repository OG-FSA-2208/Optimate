# Capstone Planning

## Contract

### Work contract

- work hours 10am-6pm
  - lunch breat 1pm-230pm
- Daily Checkins in the morning and afternoon?
  - morning, after break or at the end of the day?
- 24hr notice if possible if you are not available
- notify if unable to complete your section

### git hub work flow

- send a new message if you have completed the merge
- react to that message to show you have pulled the new main branch
- do not push to main branch
- push to branch named by the feature you are working on
  - send a message when you have a branch that is ready for a merge
  - react to the message if you are reviewing the repo
    - git checkout main
    - git pull origin main
    - git checkout `branch name`
    - git merge origin main `:wq in terminal if presented with commit message for merge`
- Add issue to the project board or assign your self an issue if not taken
-

### Pair Programming: do we need to?

- when our features otverlap
  - integrating features or components with complex logic
- If there is a known dependency on another's work
  - use place holder names that are descriptive and comments

### social contracts

- feature diagreements: majority vote
- disagreements/problems between members
  - acknowledge the issue so it can be explored while staying respectful to each other
  - If unable to resolve loop in another member to mediate
  - if problem persists, escalate to mentor

## PROJECT IDEA

- names
  - Busybee 😂
  - Errand Expert
    - logo: EE
  - On The Go
  - Just In Time
  - Get Clocked
    - logo: 🥊⏰
  - Codys Clock ⏰
  - optim-mate
    - bot: optim
    - logo: octopus 🐙:octopus:
    - :purple_heart:

> Optimal Time Scheduling (Helps user schedule their errands based on optimal time)

- create an account
- add a task > query data to return best time to go
  - reschedule
  - limit possible time suggestions
  - suggestions for other locations?
    - transportation type?
- All task view list style
  - filter options based on ENUM
  - upcoming tasks
  - full list
  - completed
  - incomplete
  - conflicts: based on time
- task view calendar
  - contains all tasks including timing
    - integration with windows calendar/google calendar
- individual task view
  - modify task
  - mark complete & reverse
  - repeat or readd old task

## WireFrame

### Front

- React
  - components
    - calender
    - class or id name on all components
  - routing
    - User
    - Admin
    - @Redux Toolkit
- LESS

### Middleware/features

- google api
  - [premade api BESTTIME](https://besttime.app/#api)
  - curl to pull google data?
  - [google distance matrix](https://developers.google.com/maps/documentation/distance-matrix/)
- car traffic api?
  - other layers

### Back

- models
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
  - relational
    - firestore
    - superbase / other dbmodels?
  - built in websockets?
  - automatic authentication? - oauth
  - google signin?
