exports.handler = async (event, context) => {
  const year = event.queryStringParameters.year || '2024';
  const apiKey = process.env.CRICKET_API_KEY;

  // For demonstration or if API key is missing, return mock data
  // In a real scenario, you'd map the year to a specific series ID for CricAPI
  // e.g. https://api.cricapi.com/v1/series_standings?apikey=${apiKey}&seriesId=ID
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getMockData(year))
    };
  }

  try {
    // Example of a real API call structure (Replace with actual endpoint)
    // const response = await fetch(`https://api.example.com/ipl/standings/${year}?apikey=${apiKey}`);
    // const data = await response.json();
    
    // Simulating API call for this demo
    const data = getMockData(year);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
};

function getMockData(year) {
  // Base mock data structure
  const baseData = [
    { team: "Kolkata Knight Riders", short: "KKR", m: 14, w: 9, l: 3, nr: 2, nrr: "+1.428", pts: 20, logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg" },
    { team: "Sunrisers Hyderabad", short: "SRH", m: 14, w: 8, l: 5, nr: 1, nrr: "+0.414", pts: 17, logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.svg" },
    { team: "Rajasthan Royals", short: "RR", m: 14, w: 8, l: 5, nr: 1, nrr: "+0.273", pts: 17, logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Rajasthan_Royals_Logo.svg" },
    { team: "Royal Challengers Bengaluru", short: "RCB", m: 14, w: 7, l: 7, nr: 0, nrr: "+0.459", pts: 14, logo: "https://upload.wikimedia.org/wikipedia/en/1/15/Royal_Challengers_Bangalore_Logo.svg" },
    { team: "Chennai Super Kings", short: "CSK", m: 14, w: 7, l: 7, nr: 0, nrr: "+0.392", pts: 14, logo: "https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg" },
    { team: "Delhi Capitals", short: "DC", m: 14, w: 7, l: 7, nr: 0, nrr: "-0.377", pts: 14, logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/Delhi_Capitals_Logo.svg" },
    { team: "Lucknow Super Giants", short: "LSG", m: 14, w: 7, l: 7, nr: 0, nrr: "-0.667", pts: 14, logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/Lucknow_Super_Giants_IPL_Logo.svg" },
    { team: "Gujarat Titans", short: "GT", m: 14, w: 5, l: 7, nr: 2, nrr: "-1.063", pts: 12, logo: "https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg" },
    { team: "Punjab Kings", short: "PBKS", m: 14, w: 5, l: 9, nr: 0, nrr: "-0.353", pts: 10, logo: "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg" },
    { team: "Mumbai Indians", short: "MI", m: 14, w: 4, l: 10, nr: 0, nrr: "-0.318", pts: 8, logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg" }
  ];

  // Randomize a bit based on the year to show dynamic data changes
  const seed = parseInt(year) || 2024;
  
  // Sort randomly but deterministically based on year to simulate different standings
  const shuffled = [...baseData].sort((a, b) => {
     const hashA = (a.team.charCodeAt(0) * seed) % 100;
     const hashB = (b.team.charCodeAt(0) * seed) % 100;
     return hashB - hashA;
  });
  
  // Reassign points based on the new order so it makes logical sense
  return shuffled.map((team, index) => {
    return {
      ...team,
      pts: 20 - (index * 2) + (index % 2 === 0 ? 1 : 0),
      w: 10 - index,
      l: index + 2,
    };
  });
}
