/**
 * Recommendation icon resolver — recommendations.json `icon` 문자열을
 * Lucide 컴포넌트로 매핑.
 */

import { Cloud, Footprints, Droplet, Pencil, Sunrise, Sparkles, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Footprints,
  Droplet,
  Pencil,
  Sunrise,
};

export function recIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}
