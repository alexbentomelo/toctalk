import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  <Dimmer active>
    <Loader size="huge" content={"Carregando o Chat..."} />
  </Dimmer>
);

export default Spinner;
