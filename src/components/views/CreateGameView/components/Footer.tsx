import { FormattedMessage } from "react-intl";
import { Link } from "wouter";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button, Stack } from "@mui/joy";

interface FooterProps {
  canCreate: boolean;
  onCreate: () => void;
}

const Footer = ({ canCreate, onCreate }: FooterProps) => (
  <Stack direction="column" gap={2}>
    <Button fullWidth color="primary" disabled={!canCreate} onClick={onCreate}>
      <FormattedMessage
        id="CreateGameView.Footer.startScoring"
        defaultMessage="Start scoring"
      />
    </Button>
    <Button
      variant="plain"
      color="primary"
      startDecorator={<InfoOutlinedIcon />}
      component={Link}
      to="/about"
    >
      <FormattedMessage
        id="CreateGameView.Footer.about"
        defaultMessage="About this app"
      />
    </Button>
  </Stack>
);

export default Footer;
