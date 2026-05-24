"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { SCHOOL_COORDINATES } from "@/lib/schoolCoordinates";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface SchoolCount {
  school: string;
  count: number;
}

interface SchoolMapProps {
  schools: SchoolCount[];
}

function pinRadius(count: number, maxCount: number): number {
  if (maxCount <= 1) return 7;
  const min = 5;
  const max = 16;
  return min + ((count / maxCount) * (max - min));
}

export default function SchoolMap({ schools }: SchoolMapProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const mapped = schools.filter((s) => SCHOOL_COORDINATES[s.school]);
  const maxCount = mapped.reduce((m, s) => Math.max(m, s.count), 1);

  const selectedSchool = mapped.find((s) => s.school === selected);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#0e0e14] overflow-hidden">
      {/* dismiss on outside click */}
      {selected && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => setSelected(null)}
        />
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "100%" }}
        className="w-full h-[340px] md:h-[440px]"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#121218"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#18181f" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {mapped.map((entry) => {
          const coord = SCHOOL_COORDINATES[entry.school];
          const r = pinRadius(entry.count, maxCount);
          const isSelected = selected === entry.school;

          return (
            <Marker
              key={entry.school}
              coordinates={[coord.lng, coord.lat]}
              onClick={() =>
                setSelected((prev) =>
                  prev === entry.school ? null : entry.school
                )
              }
            >
              {/* cursor via child SVG element */}
              <g style={{ cursor: "pointer" }}>
              {/* glow ring when selected */}
              {isSelected && (
                <circle
                  r={r + 6}
                  fill="rgba(0,255,198,0.15)"
                  stroke="rgba(0,255,198,0.4)"
                  strokeWidth={1}
                />
              )}
              {/* main pin */}
              <circle
                r={r}
                fill={isSelected ? "#00ffc6" : "rgba(0,255,198,0.7)"}
                stroke={isSelected ? "#00ffc6" : "rgba(0,255,198,0.3)"}
                strokeWidth={1.5}
              />
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Tooltip / info card */}
      {selectedSchool && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="rounded-xl border border-[#00ffc6]/30 bg-[#0b0b10]/95 backdrop-blur-md px-5 py-3 text-center shadow-2xl shadow-black/60 min-w-[180px]">
            <p className="text-white font-bold text-sm">{selectedSchool.school}</p>
            <p className="text-[#00ffc6] font-black font-mono text-lg leading-tight">
              {selectedSchool.count}
            </p>
            <p className="text-white/40 text-xs">
              {selectedSchool.count === 1 ? "athlete" : "athletes"}
            </p>
          </div>
        </div>
      )}

      {/* Empty state overlay */}
      {mapped.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white/25 text-sm">
            Be the first from your school to claim the pin.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-3 right-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00ffc6] opacity-70 inline-block" />
        <span className="text-white/30 text-xs">Tap a pin to see school</span>
      </div>
    </div>
  );
}
