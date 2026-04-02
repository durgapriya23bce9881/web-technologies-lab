# React Application for Data Fetching from External API

## 1. Introduction
This project is a React-based web application developed to demonstrate data fetching from an external API. The application retrieves data asynchronously and displays it dynamically in the user interface. It also handles loading and error states effectively.

---

## 2. Objective
The main objectives of this application are:
- To understand the use of React functional components
- To implement asynchronous API calls using JavaScript
- To utilize React Hooks such as useState and useEffect
- To manage and display dynamic data in the user interface
- To handle loading and error states during data fetching

---

## 3. Technologies Used
- React JS
- JavaScript (ES6)
- HTML
- CSS

---

## 4. Functional Requirements Implemented
- Creation of a functional component for fetching and displaying data
- Use of useState Hook to manage data, loading, and error states
- Use of useEffect Hook to perform API calls as side effects
- Fetching data using Fetch API with async/await
- Displaying fetched data dynamically using JSX
- Implementation of loading indicator during data retrieval
- Handling API errors using conditional rendering
- Ensuring API call executes only once using dependency array
- Rendering multiple data items using map() function

---

## 5. Application Flow
1. The component is loaded
2. useEffect Hook triggers the API call
3. Data is fetched asynchronously
4. State is updated with fetched data
5. UI re-renders to display the data
6. Loading and error states are handled appropriately

---

## 6. How to Run the Application

1. Open terminal and navigate to project directory:
   ```bash
   cd exercise-10-q3
   ```

2. Install required dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open the application in browser:
   ```
   http://localhost:3000
   ```

---

## 7. Conclusion
This project successfully demonstrates the implementation of data fetching in React using functional components and hooks. It highlights the use of useEffect for side effects and useState for managing dynamic data, along with proper handling of loading and error conditions.