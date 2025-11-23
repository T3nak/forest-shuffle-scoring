import { AddPlayerFormFields } from "@/components/common/AddPlayerForm";
import { GameBox } from "@/game";
import { ScoringMode } from "@/types";

export interface CreateGameFormFields extends AddPlayerFormFields {
  scoringMode: ScoringMode;
  gameBoxes: GameBox[];
}
