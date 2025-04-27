In this project I used this tech stack:

- React + Vite
- TypeScript

Getting Started
To start the app you need to, first, create a file named .env in the root of the project with the following structure:
VITE_API_BASE_URL=http://localhost:5000/api (can be replaced with env variables based on the environment)

After the dependencies are installed (needs Node.js 18+), start the application by running:
npm run dev

Future Improvements
Here are some future improvements for the frontedn:

- Adding login page and include the token in the request headers.
- Adding a search box plus a date-range filter at the top.
- Introduced pagination and included active filters in the sent request to fetch corresponding data.
- Using HighCharts library to prepare cool graphs and tables.
- Created a map page to display shipment locations on an interactive map.
