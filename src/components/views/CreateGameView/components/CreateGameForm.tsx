import * as _ from "lodash-es";
import { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/joy";

import AddPlayerForm from "@/components/common/AddPlayerForm";
import GameBoxSelector from "@/components/common/GameBoxSelector";
import { CreateGameFormFields } from "@/components/views/CreateGameView/types";
import { GameBox } from "@/game";
import * as Caves from "@/game/caves";
import { ScoringMode } from "@/types";

interface CreateGameFormProps {
  onSubmit: () => void;
}

const CreateGameForm = ({ onSubmit }: CreateGameFormProps) => {
  const [activePane, setActivePane] = useState<"player" | "expansions">(
    "player",
  );

  const { control, setValue } = useFormContext<CreateGameFormFields>();
  const [scoringMode, gameBoxes] = useWatch({
    control,
    name: ["scoringMode", "gameBoxes"],
  });

  const caveNameOptions = useMemo(
    () =>
      _.uniq(
        Object.values(Caves)
          .filter((c) => gameBoxes.includes(c.gameBox))
          .map((c) => c.name),
      ),
    [gameBoxes],
  );

  return (
    <AccordionGroup disableDivider>
      <Accordion
        sx={{ p: 0 }}
        expanded={activePane === "player"}
        onChange={(_, expanded) =>
          setActivePane(expanded ? "player" : "expansions")
        }
      >
        <AccordionSummary>
          <FormattedMessage
            id="CreateGameView.CreateGameForm.player"
            defaultMessage="Player"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" sx={{ py: 1 }}>
            <Typography level="body-sm" sx={{ mb: 2 }}>
              {scoringMode === ScoringMode.Host ? (
                <FormattedMessage
                  id="CreateGameView.CreateGameForm.instructions.host"
                  defaultMessage="Please enter the name of the player you want to start with and the number of cards in their cave below."
                />
              ) : (
                <FormattedMessage
                  id="CreateGameView.CreateGameForm.instructions.guest"
                  defaultMessage="Please enter your name and the number of cards in your cave below."
                />
              )}
            </Typography>

            <AddPlayerForm
              caveNameOptions={caveNameOptions}
              onSubmit={onSubmit}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{ p: 0 }}
        expanded={activePane === "expansions"}
        onChange={(_, expanded) =>
          setActivePane(expanded ? "expansions" : "player")
        }
      >
        <AccordionSummary>
          <Typography>
            <FormattedMessage
              id="CreateGameView.CreateGameForm.expansions"
              defaultMessage="Expansions <secondary>({count, plural, =0 {none} =4 {all} other {#}} selected)</secondary>"
              values={{
                count: gameBoxes.length - 1,
                secondary: (chunks) => (
                  <Typography
                    level="body-sm"
                    color="neutral"
                    fontWeight="normal"
                  >
                    {chunks}
                  </Typography>
                ),
              }}
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GameBoxSelector
            sx={{ py: 1, pl: 0.5 }}
            ignore={[GameBox.Base]}
            value={gameBoxes}
            onChange={(value) => setValue("gameBoxes", value)}
          />
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default CreateGameForm;
