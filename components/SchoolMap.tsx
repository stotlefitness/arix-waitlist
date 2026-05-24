"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { SCHOOLS } from "@/lib/schools";
import {
  SCHOOL_COORDINATES,
  STATE_NAME_TO_CODE,
  STATE_CODE_TO_NAME,
} from "@/lib/schoolCoordinates";

const GEO_URL = "/geo/us-states-10m.json";

interface SchoolCount {
  school: string;
  count: number;
}

interface SchoolMapProps {
  schools: SchoolCount[];
}

interface MappedSchool {
  school: string;
  count: number;
  mapLat: number;
  mapLng: number;
  abbr: string;
  color: string;
  state: string;
}

export default function SchoolMap({ schools }: SchoolMapProps) {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [hoveredStateCode, setHoveredStateCode] = useState<string | null>(null);

  const mapped: MappedSchool[] = useMemo(() => {
    const countBySchool = new Map(schools.map((s) => [s.school, s.count]));
    return SCHOOLS.filter((name) => SCHOOL_COORDINATES[name]).map((school) => {
      const meta = SCHOOL_COORDINATES[school];
      return {
        school,
        count: countBySchool.get(school) ?? 0,
        mapLat: meta.mapLat,
        mapLng: meta.mapLng,
        abbr: meta.abbr,
        color: meta.color,
        state: meta.state,
      };
    });
  }, [schools]);

  const selectedSchoolData =
    mapped.find((s) => s.school === selectedSchool) ?? null;

  const highlightedState =
    selectedSchoolData?.state ?? hoveredStateCode ?? null;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: "#0d0d18", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div style={{ aspectRatio: "1000 / 560" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          width={1000}
          height={560}
          style={{ width: "100%", height: "100%", display: "block" }}
          projectionConfig={{ scale: 1200 }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name as string;
                const code = STATE_NAME_TO_CODE[stateName];
                const isHighlighted = code && highlightedState === code;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#1a2438" : "#14141f"}
                    stroke={
                      isHighlighted
                        ? "rgba(0,255,198,0.35)"
                        : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth={isHighlighted ? 1 : 0.7}
                    style={{
                      default: { outline: "none", cursor: "default" },
                      hover: { outline: "none", fill: "#1c1c2c" },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => setSelectedSchool(null)}
                  />
                );
              })
            }
          </Geographies>

          {mapped.map((entry) => {
            const isSelected = selectedSchool === entry.school;
            const outerR = isSelected ? 16 : 14;
            const ringR = isSelected ? 10 : 9;
            const coreR = 3;

            return (
              <Marker
                key={entry.school}
                coordinates={[entry.mapLng, entry.mapLat]}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSchool((prev) =>
                    prev === entry.school ? null : entry.school
                  );
                }}
                onMouseEnter={() => setHoveredStateCode(entry.state)}
                onMouseLeave={() => setHoveredStateCode(null)}
              >
                <g style={{ cursor: "pointer" }}>
                  <circle
                    r={outerR}
                    fill={entry.color}
                    fillOpacity={0.35}
                  />
                  <circle
                    r={ringR}
                    fill={entry.color}
                    fillOpacity={1}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                  <circle r={coreR} fill="#ffffff" fillOpacity={1} />
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {selectedSchoolData && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div
            className="rounded-xl px-6 py-4 text-center"
            style={{
              background: "rgba(8,8,18,0.97)",
              border: `2px solid ${selectedSchoolData.color}`,
              boxShadow: `0 0 32px ${selectedSchoolData.color}44`,
              minWidth: 200,
            }}
          >
            <p
              className="font-black text-xl leading-none"
              style={{ color: selectedSchoolData.color }}
            >
              {selectedSchoolData.abbr}
            </p>
            <p className="text-white font-semibold text-sm mt-1.5">
              {selectedSchoolData.school}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {STATE_CODE_TO_NAME[selectedSchoolData.state] ??
                selectedSchoolData.state}
            </p>
            <p className="text-white/70 text-sm mt-3 leading-snug">
              Athletes from {selectedSchoolData.school} are on the waitlist.
            </p>
            {selectedSchoolData.count > 0 && (
              <p className="text-white/40 text-xs mt-2">
                {selectedSchoolData.count}{" "}
                {selectedSchoolData.count === 1 ? "athlete" : "athletes"} so far
              </p>
            )}
          </div>
        </div>
      )}

      <p className="absolute bottom-3 right-4 text-white/25 text-[11px] pointer-events-none">
        {selectedSchool ? "Tap map to dismiss" : "Tap a school to learn more"}
      </p>
    </div>
  );
}
