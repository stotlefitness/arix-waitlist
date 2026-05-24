import { geoAlbersUsa } from "d3-geo";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 580;
const MAP_SCALE = 1200;

/** Marker footprint in SVG pixels (glow + ring bubbles). */
function markerFootprint(): { w: number; h: number } {
  return { w: 40, h: 40 };
}

function minDistance(a: { w: number; h: number }, b: { w: number; h: number }): number {
  return Math.max(a.w, b.w) * 0.75 + Math.max(a.h, b.h) * 0.55 + 14;
}

export interface LayoutPoint {
  school: string;
  ox: number;
  oy: number;
}

/**
 * Nudge overlapping markers apart in screen space while keeping anchors at campus coords.
 */
export function layoutSchoolMarkers(
  schools: { school: string; lng: number; lat: number; abbr: string }[]
): Map<string, { ox: number; oy: number }> {
  const projection = geoAlbersUsa()
    .scale(MAP_SCALE)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

  type Node = {
    school: string;
    x: number;
    y: number;
    ox: number;
    oy: number;
    size: { w: number; h: number };
  };

  const nodes: Node[] = schools
    .map((s) => {
      const projected = projection([s.lng, s.lat]);
      if (!projected) return null;
      return {
        school: s.school,
        x: projected[0],
        y: projected[1],
        ox: 0,
        oy: 0,
        size: markerFootprint(),
      };
    })
    .filter((n): n is Node => n !== null);

  for (let iter = 0; iter < 60; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x + b.ox - (a.x + a.ox);
        const dy = b.y + b.oy - (a.y + a.oy);
        const dist = Math.hypot(dx, dy);
        const need = minDistance(a.size, b.size);
        if (dist < need && dist > 0.001) {
          const push = (need - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.ox -= nx * push;
          a.oy -= ny * push;
          b.ox += nx * push;
          b.oy += ny * push;
        }
      }
    }
  }

  return new Map(nodes.map((n) => [n.school, { ox: n.ox, oy: n.oy }]));
}
