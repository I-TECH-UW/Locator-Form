export const airlines = [
  {
    "value": "Air Austral",
    "label": "Air Austral",
    "flight": ["UU103", "UU119", "UU105", "UU109"]
  },
  {
    "value": "Air Belgium",
    "label": "Air Belgium",
    "flight": []
  },
  {
    "value": "Air France",
    "label": "Air France",
    "flight": ["AF473"]
  },
  {
    "value": "Air India",
    "label": "Air India",
    "flight": []
  },
  {
    "value": "Air Madagascar",
    "label": "Air Madagascar",
    "flight": []
  },
  {
    "value": "Air Mauritius",
    "label": "Air Mauritius",
    "flight": ["MK120", "MK851", "MK851", "MK126", "MK218", "MK130", "MK228", "MK140", "MK238", "MK150", "MK042", "MK014"]
  },
  {
    "value": "Air Seychelles",
    "label": "Air Seychelles",
    "flight": []
  },
  {
    "value": "Austrian Airlines",
    "label": "Austrian Airlines",
    "flight": ["OS018"]
  },
  {
    "value": "British Airways",
    "label": "British Airways",
    "flight": ['BA2062', 'BA230']
  },
  {
    "value": "China Eastern",
    "label": "China Eastern",
    "flight": []
  },
  {
    "value": "Comair",
    "label": "Comair",
    "flight": []
  },
  {
    "value": "Condor Flugdienst",
    "label": "Condor Flugdienst",
    "flight": ["DE2315"]
  },
  {
    "value": "Corsair International",
    "label": "Corsair International",
    "flight": ["SS953"]
  },
  {
    "value": "Edelweiss Air",
    "label": "Edelweiss Air",
    "flight": []
  },
  {
    "value": "Egypt Air",
    "label": "Egypt Air",
    "flight": []
  },
  {
    "value": "Emirates",
    "label": "Emirates",
    "flight": ["EK702", "EK704"]
  },
  {
    "value": "Eurowings",
    "label": "Eurowings",
    "flight": ["4Y153"]
  },
  {
    "value": "Hong Kong Airlines",
    "label": "Hong Kong Airlines",
    "flight": []
  },
  {
    "value": "Kenya Airways",
    "label": "Kenya Airways",
    "flight": ["KQ271"]
  },
  {
    "value": "KLM",
    "label": "KLM",
    "flight": []
  },
  {
    "value": "Lufthansa",
    "label": "Lufthansa",
    "flight": []
  },
  {
    "value": "Private Jet",
    "label": "Private Jet",
    "flight": []
  },
  {
    "value": "Saudi Arabian Airlines",
    "label": "Saudi Arabian Airlines",
    "flight": []
  },
  {
    "value": "Singapore Airlines",
    "label": "Singapore Airlines",
    "flight": []
  },
  {
    "value": "South African Airways",
    "label": "South African Airways",
    "flight": []
  },
  {
    "value": "TUI Airways",
    "label": "TUI Airways",
    "flight": []
  },
  {
    "value": "Turkish Airlines",
    "label": "Turkish Airlines",
    "flight": []
  },
]


export const getFlightList = (alirline) => {
  const flightList = []
  if (alirline) {
    const flights = airlines.find((e) => e.value === alirline).flight;
    if (flights.length === 0) {
      flightList.push({ "value": "", "label": "" });
    } else {
      flights.forEach(f => flightList.push({ "value": f, "label": f }));
    }

    return flightList;
  }
}
