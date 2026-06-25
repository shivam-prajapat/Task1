# Product Recommendation System

A React application that uses AI to recommend products based on user preferences.

## Tech Stack

- React (functional components, useState)
- Vite
- Groq API (llama-3.1-8b-instant)
- Plain CSS

## Features

- Search products using natural language (e.g. "phone under $300")
- AI-powered recommendations via Groq API
- Client-side price and category validation
- Add new products to the list at runtime
- Handles edge cases — shows proper message when no products match

## Project Structure

```
src/
├── data/
│   └── products.js          # Product list (100 items)
├── services/
│   └── geminiService.js     # Groq API integration
├── utils/
│   └── filterUtils.js       # Client-side price/category filter
├── components/
│   ├── SearchBar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── RecommendationList.jsx
│   └── AddProductForm.jsx
├── App.jsx
└── App.css
```

## Setup

1. Clone the repo
   ```bash
   git clone https://github.com/shivam-prajapat/Task1.git
   cd Task1
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file
   ```bash
   cp .env.example .env
   ```
   Add your Groq API key (free at https://console.groq.com/keys):
   ```
   VITE_GROQ_API_KEY=your-key-here
   ```

4. Run the app
   ```bash
   npm run dev
   ```

## How it works

1. User types a preference like "laptop under $600"
2. The query and full product list are sent to Groq AI
3. AI returns matching product IDs
4. Client-side filter validates results against actual price and category
5. Matching products are displayed
