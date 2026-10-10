import { Bank, BookOpen, Brain, Briefcase, Buildings, ChartBar, Copy, Copyright, Detective, Drop, Factory, FileText, Flame, GlobeHemisphereWest, GraduationCap, Hourglass, Lightbulb, Lightning, Link, Lock, MagnifyingGlass, MapPin, Megaphone, Palette, PauseCircle, Plug, PoliceCar, Receipt, Robot, Scales, SmileyMeh, Tag, Target, Trash, TrendDown, TrendUp, User, Wind } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

const ICONS: Record<string, Icon> = {
  "bank": Bank,
  "book-open": BookOpen,
  "brain": Brain,
  "briefcase": Briefcase,
  "buildings": Buildings,
  "chart-bar": ChartBar,
  "copy": Copy,
  "copyright": Copyright,
  "detective": Detective,
  "drop": Drop,
  "factory": Factory,
  "file-text": FileText,
  "flame": Flame,
  "globe-hemisphere-west": GlobeHemisphereWest,
  "graduation-cap": GraduationCap,
  "hourglass": Hourglass,
  "lightbulb": Lightbulb,
  "lightning": Lightning,
  "link": Link,
  "lock": Lock,
  "magnifying-glass": MagnifyingGlass,
  "map-pin": MapPin,
  "megaphone": Megaphone,
  "palette": Palette,
  "pause-circle": PauseCircle,
  "plug": Plug,
  "police-car": PoliceCar,
  "receipt": Receipt,
  "robot": Robot,
  "scales": Scales,
  "smiley-meh": SmileyMeh,
  "tag": Tag,
  "target": Target,
  "trash": Trash,
  "trend-down": TrendDown,
  "trend-up": TrendUp,
  "user": User,
  "wind": Wind,
};

export function CtIcon({ name, size = 44 }: { name: string; size?: number }) {
  const I = ICONS[name];
  if (!I) return null;
  return <span className="ct-icon inline-flex" aria-hidden="true"><I size={size} weight="duotone" /></span>;
}
