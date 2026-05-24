export interface SchoolMeta {
  /** True campus latitude */
  lat: number;
  /** True campus longitude */
  lng: number;
  /** Marker position on Albers USA map (tuned so clusters don’t overlap) */
  mapLat: number;
  mapLng: number;
  abbr: string;
  color: string;
  state: string;
}

/** Map markers for curated waitlist schools only. */
export const SCHOOL_COORDINATES: Record<string, SchoolMeta> = {
  "Stanford":                { lat: 37.434, lng: -122.169, mapLat: 37.43, mapLng: -122.17, abbr: "S",    color: "#E05252", state: "CA" },
  "Menlo College":           { lat: 37.452, lng: -122.181, mapLat: 37.48, mapLng: -122.28, abbr: "MC",   color: "#FF6B6B", state: "CA" },
  "Santa Clara":             { lat: 37.349, lng: -121.938, mapLat: 37.32, mapLng: -121.88, abbr: "SCU",  color: "#E85D75", state: "CA" },
  "Cal Berkeley":            { lat: 37.872, lng: -122.259, mapLat: 37.90, mapLng: -122.30, abbr: "CAL",  color: "#3B9FE8", state: "CA" },
  "UCLA":                    { lat: 34.069, lng: -118.445, mapLat: 34.07, mapLng: -118.25, abbr: "UCLA", color: "#4DA3FF", state: "CA" },
  "USC":                     { lat: 34.022, lng: -118.285, mapLat: 33.92, mapLng: -118.40, abbr: "SC",   color: "#FF6A3D", state: "CA" },
  "Yale":                    { lat: 41.316, lng: -72.922,  mapLat: 41.32, mapLng: -72.92,  abbr: "Y",    color: "#4A90D9", state: "CT" },
  "Boston University":       { lat: 42.350, lng: -71.099,  mapLat: 42.36, mapLng: -71.05,  abbr: "BU",   color: "#FF3B3B", state: "MA" },
  "Columbia":                { lat: 40.808, lng: -73.962,  mapLat: 40.81, mapLng: -74.02,  abbr: "CU",   color: "#7EC8E8", state: "NY" },
  "Northwestern":            { lat: 42.056, lng: -87.675,  mapLat: 42.08, mapLng: -87.72,  abbr: "NU",   color: "#9B6FD4", state: "IL" },
  "U Chicago":               { lat: 41.789, lng: -87.599,  mapLat: 41.78, mapLng: -87.45,  abbr: "UCHI", color: "#FF7070", state: "IL" },
  "Indiana":                 { lat: 39.168, lng: -86.521,  mapLat: 39.17, mapLng: -86.52,  abbr: "IU",   color: "#FF4444", state: "IN" },
  "Purdue":                  { lat: 40.428, lng: -86.916,  mapLat: 40.43, mapLng: -86.92,  abbr: "P",    color: "#E8C56A", state: "IN" },
  "Iowa State":              { lat: 42.026, lng: -93.648,  mapLat: 42.03, mapLng: -93.65,  abbr: "ISU",  color: "#FF4D4D", state: "IA" },
  "University of South Dakota": { lat: 42.786, lng: -96.931, mapLat: 42.79, mapLng: -96.93, abbr: "USD", color: "#FF5C8A", state: "SD" },
  "Michigan":                { lat: 42.278, lng: -83.738,  mapLat: 42.28, mapLng: -83.74,  abbr: "M",    color: "#5EB6FF", state: "MI" },
  "Saginaw Valley State":    { lat: 43.559, lng: -83.977,  mapLat: 43.56, mapLng: -83.98,  abbr: "SVSU", color: "#FF5555", state: "MI" },
  "Utah":                    { lat: 40.764, lng: -111.842, mapLat: 40.76, mapLng: -111.84, abbr: "U",    color: "#FF5252", state: "UT" },
};

/** US state full name (from topojson) → postal code */
export const STATE_NAME_TO_CODE: Record<string, string> = {
  California: "CA",
  Connecticut: "CT",
  Illinois: "IL",
  Iowa: "IA",
  Michigan: "MI",
  Massachusetts: "MA",
  "South Dakota": "SD",
  "New York": "NY",
  Indiana: "IN",
  Utah: "UT",
};

export const STATE_CODE_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_NAME_TO_CODE).map(([name, code]) => [code, name])
);
