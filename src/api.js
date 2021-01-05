// API SERVICES

// ANOTHER API https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true

export async function getTotalByAllCountries() {
  let response = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true');
  let data = await response.json();
  return data;
}

