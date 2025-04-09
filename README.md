## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```


-------- 

## What I would do in the Real World

- Coordinate With PM on need & value of this project - prioritize accordingly 
- In tandem with PM coordinate with product designer to ensure style consistency
- In tandem with PM, confirm technical and product specs are aligned 
- Break tickets down into manageable chunks

### Potential Tickets - Flexible w/ Time Constraints

- Extend Foundation (Prevent Tech Debt)
  - Frontend 
    - API Classes
    - Component Directory
    - Utils
  - Backend
    - API Layer
    - Service Layer
    - Database Layer
  - Database
    - Migration File Setup
- Product Work
  - Backend
    - Get Advocates Functionality
    - Pagination Functionality
    - Search Functionality
    - Advanced Filtering (Nice to have)
  - Frontend
    - Styling Improvements
    - Pagination Component
    - API Classes
      - Base
      - Advocate
    - Loading & Error Components (Nice to Have)


## What I would have done with more time

- Separate backend into an API, Service and database layer
- Improve setup of Database 
  - Migration Files for version tracking
  - Seed Data automatically on startup
  - Move migration to docker compose for devEx reasons
  - Setup file should trigger migration if needed
  - Remove Seed Routes as it won’t be needed
- Update Drizzle as library version prevented a better pagination method when querying DB
- Extend API Class to include full CRUD + Improved Error Handling
  - Error Handling to be more user-friendly - Ways to report a bug could be a nice option
- Get API
  - Search Functionality moved to the backend
  - More advanced filter - Multiple Options
  - Pagination using Database functionality instead of manually doing it
- Sortable Table



