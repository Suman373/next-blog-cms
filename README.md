### Full Stack Blogging Platform 

A Full Stack blogging platform with easy blog management, category management and markdown support.

#### Demo link 
 [Click here](https://www.loom.com/share/78cab53de47849bb963a685a6108f098?sid=3ef5ad92-c788-410b-b7fb-a3d0d19b4dbd
)
#### Tech stack

1. NextJs - Creating interfaces and server components
2. PostgreSQL (Supabase) - Relational database 
3. Drizzle ORM - Type-safe queries and schemas 
4. tRPC - Type-safe API layer
5. Zod - Schema validation
6. React Query - Integrated via tRPC for caching and invalidation
7. Zustand - Easy global state management 
8. Typescript - Static typing and interfaces
9. Tailwind CSS - Framework for styling
10. Shadcn/ui - Customizable components
11. React Simple-MDE - Markdown editor
12. React markdown - Parsing markdown content

#### Features

- Blog post CRUD operations (create, read, update, delete)
- Category CRUD operations
- Assign one or more categories to posts
- Blog listing page showing all posts
- Individual post view page
- Category filtering on listing page
- Landing page with at least 3 sections (Header/Hero, Features, Footer)
- Dashboard page for managing posts
- Draft vs Published post status
- Content editor

#### Starting project locally

```
Clone the repo 
git clone https://github.com/Suman373/next-blog-cms.git

Change dir and install dependencies
cd next-blog-cms 
npm install

Run the development server
npm run dev

This will start the development server running at http://localhost:3000

```
#### Env variables
```
Create a project in Supabase and get the connection string 

Create a .env.local file in the root
Define the database url. For example,

DATABASE_URL= postgresql://postgres:@db.<your-password>.supabase.co:<port>/postgres"

Define the base url 

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

```


#### Feedback

For feedback, send an email to reachsuman.roy@gmail.com


#### Author

Suman Roy 