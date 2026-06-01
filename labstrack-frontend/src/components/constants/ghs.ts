import explosive from "@/assets/ghs/explosive.svg";
import flammable from "@/assets/ghs/flammable.svg";
import oxidising from "@/assets/ghs/oxidising.svg";
import corrosive from "@/assets/ghs/corrosive.svg";
import toxic from "@/assets/ghs/toxic.svg";
import harmful from "@/assets/ghs/harmful.svg";
import health_hazard from "@/assets/ghs/health_hazard.svg";
import environmental from "@/assets/ghs/environmental.svg";

export interface GHSPictogram {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const GHS_PICTOGRAMS: Record<string, GHSPictogram> = {
  explosive: {
    id: "explosive",
    name: "Explosivo",
    description: "Sustancias inestables o explosivas",
    icon: explosive,
  },

  flammable: {
    id: "flammable",
    name: "Inflamable",
    description: "Gases, aerosoles, líquidos y sólidos inflamables",
    icon: flammable,
  },

  oxidising: {
    id: "oxidising",
    name: "Comburente",
    description: "Gases, líquidos y sólidos comburentes",
    icon: oxidising,
  },

  corrosive: {
    id: "corrosive",
    name: "Corrosivo",
    description: "Corrosivo para metales y piel",
    icon: corrosive,
  },

  toxic: {
    id: "toxic",
    name: "Toxicidad aguda",
    description: "Mortal o tóxico",
    icon: toxic,
  },

  harmful: {
    id: "harmful",
    name: "Irritante / Peligroso",
    description: "Irritación cutánea, ocular o toxicidad leve",
    icon: harmful,
  },

  health_hazard: {
    id: "health_hazard",
    name: "Peligro para la salud",
    description: "Carcinógeno, mutágeno, sensibilizante respiratorio",
    icon: health_hazard,
  },

  environmental: {
    id: "environmental",
    name: "Peligroso para el medio ambiente",
    description: "Peligros para el medio ambiente acuático",
    icon: environmental,
  },
};