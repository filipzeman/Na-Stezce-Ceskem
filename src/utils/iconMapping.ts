import type { Point } from "../types/point";
import type { IconName } from "../types/icons";

export function getPointIcons(point: Point): IconName[] {
  const icons: IconName[] = [];

  // --- TYPE MAPPING ---
  const categoryMap: Record<string, IconName> = {
    ubytovani: "Bed",
    obcerstveni: "Utensils",
    navigace: "Signpost",
    doprava: "BusFront",
    turisticke_cile: "Mountain",
    ostatni: "Info",
  };

  if (point.categoryKey && categoryMap[point.categoryKey]) {
    icons.push(categoryMap[point.categoryKey]);
  }

  return icons;
}

export function getPointTypeIcons(point: Point): IconName[] {
  const icons: IconName[] = [];

  // --- TYPE MAPPING (all possible type values from Point data types) ---
  const typeIconMap: Record<string, IconName> = {
    // Accommodation types
    hotel: "Hotel",
    penzion: "Hotel",
    turisticka_chata: "House",
    kemp: "Tent",
    nouzove_nocoviste: "Tent",
    trail_angel: "Info",
    // Food types
    restaurace: "Utensils",
    bufet: "Utensils",
    lesni_bar: "Utensils",
    obchod: "ShoppingBasket",
    vecerka: "ShoppingBasket",
    kavarna: "Coffee",
    pekarna: "Croissant",
    zdroj_vody: "Droplets",
    // Navigation types
    rozcestnik: "Signpost",
    milnik: "Flag",
    mapa: "Map",
    zacatek_etapy: "ArrowDownToLine",
    konec_etapy: "ArrowRightFromLine",
    nouzovy_bod: "Info",
    uzavirka: "Info",
    turisticky_pristresek: "Tent",
    vrchol: "Mountain",
    hranicni_prechod: "Footprints",
    // Transport types
    vlakova_zastavka: "TrainFront",
    autobusova_zastavka: "BusFront",
    prevoz: "Ship",
    parkoviste: "SquareParking",
    nabijeci_stanice: "EvCharger",
    // Touristic goal types
    kostel: "Church",
    chapel: "Church",
    kulturni_pamatka: "Castle",
    rozhledna: "ChessRook",
    vyhlidka: "Telescope",
    pamatny_strom: "TreePine",
    turisticke_informacni_centrum: "Info",
    muzeum: "Landmark",
    kriz: "Info",
    pechotni_srub: "Landmark",
    ruina: "Landmark",
    // Other service types
    obec: "Building2",
    razitko: "Stamp",
    zasilkovna: "Package",
    posta: "Mail",
    bankomat: "BadgeEuro",
  };

  if (point.typeKey && typeIconMap[point.typeKey]) {
    icons.push(typeIconMap[point.typeKey]);
  }

  return icons;
}
