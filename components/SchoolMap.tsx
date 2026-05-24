"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { SCHOOL_COORDINATES } from "@/lib/schoolCoordinates";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface SchoolCount {
  school: string;
  count: number;
}

interface SchoolMapProps {
  schools: SchoolCount[];
}

function fontSize(count: number, maxCount: number, abbr: string): number {
  const base = abbr.length > 3 ? 7 : abbr.length > 2 ? 8 : abbr.length > 1 ? 9 : 11;
  if (maxCount <= 1) return base;
  const scale = 1 + (count / maxCount) * 0.6;
  return Math.round(base * scale);
}

export default function SchoolMap({ schools }: SchoolMapProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const mapped = schools.filter((s) => SCHOOL_COORDINATES[s.school]);
  const maxCount = mapped.reduce((m, s) => Math.max(m, s.count), 1);
  const selectedSchool = mapped.find((s) => s.school === selected);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#0e0e14] overflow-hidden">
      {selected && (
        <div
          className="absolute inset-0 z-0"
          onClick={() => setSelected(null)}
        />
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "100%" }}
        className="w-full h-[360px] md:h-[500px]"
        projectionConfig={{ scale: 900 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#141420"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.6}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none", fill: "#1a1a28" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {mapped.map((entry) => {
          const coord = SCHOOL_COORDINATES[entry.school];
          const isSelected = selected === entry.school;
          const fs = fontSize(entry.count, maxCount, coord.abbr);
          // background pill width scales with abbr length
          const pillW = Math.max(fs * coord.abbr.length * 0.72 + 8, 18);
          const pillH = fs + 7;

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
              <g style={{ cursor: "pointer" }}>
                {/* selection ring */}
                {isSelected && (
                  <ellipse
                    rx={pillW / 2 + 5}
                    ry={pillH / 2 + 4}
                    fill="rgba(255,255,255,0.08)"
                    stroke={coord.color}
                    strokeWidth={1.5}
                    strokeOpacity={0.7}
                  />
                )}
                {/* dark pill background for readability */}
                <rect
                  x={-pillW / 2}
                  y={-pillH / 2}
                  width={pillW}
                  height={pillH}
                  rx={3}
                  fill="rgba(10,10,16,0.75)"
                />
                {/* school letter mark */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 900,
                    fontSize: fs,
                    fill: isSelected ? "#ffffff" : coord.color,
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                  }}
                >
                  {coord.abbr}
                </text>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Selected school tooltip */}
      {selectedSchool && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div
            className="rounded-xl px-5 py-3 text-center shadow-2xl shadow-black/80 min-w-[160px] border"
            style={{
              background: "rgba(10,10,16,0.95)",
              borderColor: `${SCHOOL_COORDINATES[selectedSchool.school].color}55`,
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              className="font-black text-sm tracking-wide"
              style={{ color: SCHOOL_COORDINATES[selectedSchool.school].color }}
            >
              {SCHOOL_COORDINATES[selectedSchool.school].abbr}
            </p>
            <p className="text-white font-semibold text-xs mt-0.5">
              {selectedSchool.school}
            </p>
            <p className="font-black font-mono text-lg text-white leading-tight mt-1">
              {selectedSchool.count}
            </p>
            <p className="text-white/40 text-xs">
              {selectedSchool.count === 1 ? "athlete" : "athletes"}
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {mapped.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white/25 text-sm tracking-wide">
            Be the first from your school to claim the spot.
          </p>
        </div>
      )}

      {/* Hint */}
      <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
        <span className="text-white/20 text-xs">Tap a logo to see school</span>
      </div>
    </div>
  );
}
