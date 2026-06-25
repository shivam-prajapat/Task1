const CATEGORY_KEYWORDS = {
  headphone: "Headphone",
  earphone:  "Headphone",
  headset:   "Headphone",
  earbud:    "Headphone",
  phone:     "Phone",
  smartphone:"Phone",
  mobile:    "Phone",
  laptop:    "Laptop",
  computer:  "Laptop",
  notebook:  "Laptop",
  tablet:    "Tablet",
  accessory: "Accessory",
};

function extractConstraints(userPreference) {
  const text = userPreference.toLowerCase();

 
  const withKeyword = text.match(
    /(?:under|below|less than|max|maximum|cheaper than|within|upto|up to)\s*\$?\s*(\d+)/
  );

  const withPreposition = text.match(
    /(?:of|for|at|around|about|costing|priced at?)\s*\$?\s*(\d+)/
  );

  const bareAmount = text.match(/\$\s*(\d+)|(\d+)\s*\$/);

  let maxPrice = null;

  if (withKeyword) {
    maxPrice = parseInt(withKeyword[1]);
  } else if (withPreposition) {
    maxPrice = parseInt(withPreposition[1]);
  } else if (bareAmount) {
    maxPrice = parseInt(bareAmount[1] ?? bareAmount[2]);
  }

  let matchedCategory = null;
  for (const [keyword, category] of Object.entries(CATEGORY_KEYWORDS)) {
    if (text.includes(keyword)) {
      matchedCategory = category;
      break;
    }
  }

  return { maxPrice, matchedCategory };
}

function applyConstraints(products, userPreference) {
  const { maxPrice, matchedCategory } = extractConstraints(userPreference);

  return products.filter((p) => {
    if (maxPrice !== null && p.price > maxPrice) return false;
    if (matchedCategory && p.category !== matchedCategory) return false;
    return true;
  });
}

export { applyConstraints };
