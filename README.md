## Tech stack explanation

**React** - High interactivity results in many DOM changes which are costly. React allows us to focus more on the how applications should work and not on how to efficiently operate on the DOM.

**React state** - In this project there is not many connections between different point of applications. In case if state was being shared by two component and could land directly within a parent I went for that option.

**React context** - Different context providers allowed to group data and manipulation on it in the same place and to provide access for this functionality without drilling through props on many levels.

**styled-components** - easily generating styles in different component states based on passed props and coupling styles with components for faster changes.

**react-minimal-pie-chart** - small library to display pie chart used because it fulfilled the needs of the UI

## How to mitigate the problem of two users moderating content for the same posts

For such scenario one of the solutions would be to provide information via web sockets and mark each post with user avatar that is currently moderating content within it. Seeing avatar upon posts would be a sign for the user to pick another one. Post could be marked with status "moderated" when somebody would start any action in the comment section.

## Timeline (from diary.md)

1. Check project requirements - 20 min
2. Use CRA to create app barebones - 5 min
3. Write down data points for app - 10 min
4. Fetch posts via custom hook - 35 min
5. Animate spinner and add default data for fetching hook to avoid IF statement within component - 10 min
6. Display comments of selected post - 30 min
7. Inputs for tag suggestions and comment text - 60 min
8. Use autocompletion for tags and add both admin comment and tag to the post comment - 60 min
9. Display top three tags within a graph - 40 min
10. Add filters for comment tags - 50 min
11. Add filters for usernames - 30 min

### To run the project: `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
