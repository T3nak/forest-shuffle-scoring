import * as _ from "lodash-es";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import { Button, DialogContent, DialogTitle, ModalClose } from "@mui/joy";

import AddPlayerForm, {
  AddPlayerFormFields,
} from "@/components/common/AddPlayerForm";
import ResponsiveDrawer from "@/components/common/ResponsiveDrawer";
import { Cave, Game } from "@/game";

const transitionDuration = 300;

interface CreatePlayerFields {
  playerName: string;
  cave: Cave;
}

interface AddPlayerDrawerProps {
  open: boolean;
  game: Game;
  onCreate: (values: CreatePlayerFields) => void;
  onClose: () => void;
}

const AddPlayerDrawer = ({
  open = false,
  game,
  onCreate,
  onClose,
}: AddPlayerDrawerProps) => {
  const form = useForm<AddPlayerFormFields>({
    mode: "onChange",
    defaultValues: {
      playerName: "",
      caveName: "REGULAR_CAVE",
      caveCardCount: 0,
    },
  });
  const {
    formState: { isValid },
    reset,
    handleSubmit,
  } = form;

  const caveNameOptions = useMemo(
    () => _.uniq(game.deck.caves.map((c) => c.name)),
    [game.deck.caves],
  );

  const handleCreate = (values: AddPlayerFormFields) => {
    const cave = game.deck.caves.find((c) => c.name === values.caveName);
    if (!cave) {
      return;
    }

    onCreate?.({
      playerName: values.playerName,
      cave: {
        ...cave,
        cardCount: values.caveCardCount,
      },
    });
    onClose?.();
  };

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => reset(), transitionDuration);
      return () => clearTimeout(timeout);
    }
  }, [open, reset]);

  return (
    <ResponsiveDrawer
      anchorSmall="bottom"
      anchorBig="right"
      breakpoint="sm"
      size="md"
      open={open}
      onClose={onClose}
      sx={{
        "--Drawer-transitionDuration": `${transitionDuration}ms`,
        "--Drawer-verticalSize": "auto",
      }}
    >
      <ModalClose />

      <DialogTitle>
        <FormattedMessage
          id="AddPlayerDrawer.title"
          defaultMessage="Add player"
        />
      </DialogTitle>

      <DialogContent sx={{ m: 1.5 }}>
        <FormProvider {...form}>
          <AddPlayerForm
            caveNameOptions={caveNameOptions}
            existingPlayers={game.players}
            onSubmit={handleSubmit(handleCreate)}
          />
        </FormProvider>

        <Button
          color="primary"
          disabled={!isValid}
          onClick={handleSubmit(handleCreate)}
          sx={{ mt: 3 }}
        >
          <FormattedMessage
            id="AddPlayerDrawer.create"
            defaultMessage="Add player"
          />
        </Button>
      </DialogContent>
    </ResponsiveDrawer>
  );
};

export default AddPlayerDrawer;
