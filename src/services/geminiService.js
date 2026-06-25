const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function normalizeInput(userPreference) {
  
  return userPreference.replace(/(?<!\$)\b(\d+)\b/g, "$$$1");
}

function buildPrompt(userPreference, products) {
  let prompt = `You are a strict product filter. Your job is to check each product against the user's requirement and return ONLY the IDs of products that satisfy ALL conditions.\n\n`;
  prompt += `User Requirement: ${userPreference}\n\n`;
  prompt += `RULES:\n`;
  prompt += `- "under $X" means the product price must be LESS THAN X. Do NOT include products at or above X.\n`;
  prompt += `- Match the category too (e.g. "phone" means category is Phone).\n`;
  prompt += `- If no products satisfy all conditions, return []\n\n`;
  prompt += `Products to check:\n`;
  products.forEach((product) => {
    prompt += `ID ${product.id}: ${product.name} | Category: ${product.category} | Price: $${product.price}\n`;
  });
  prompt += `\nGo through each product, check its price and category against the requirement, then return ONLY a raw JSON array of matching IDs.\n`;
  prompt += `No explanation. No markdown. Just the array. Example: [2] or []`;
  return prompt;
}

async function getRecommendations(userPreference, products) {
  if (!API_KEY) {
    throw new Error(
      "API key not set."
    );
  }

  const normalizedPreference = normalizeInput(userPreference);

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a strict product filter. You only return a raw JSON array of product IDs. You never include a product if its price exceeds the user's budget. You never add explanations or markdown.",
        },
        {
          role: "user",
          content: buildPrompt(normalizedPreference, products),
        },
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.choices[0].message.content.trim();

  const match = rawText.match(/\[[\d,\s]*\]/);
  if (!match) return [];

  const recommendedIds = JSON.parse(match[0]);
  return Array.isArray(recommendedIds) ? recommendedIds : [];
}

export { getRecommendations };
