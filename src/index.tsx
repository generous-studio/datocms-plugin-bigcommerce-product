import React from "react";
import { render } from "react-dom";

import DatoCmsPlugin from "datocms-plugins-sdk";
import "./styles/index.css";
import { Plugin } from "./types/Plugin";
import { WithPluginContext } from "./context/PluginContext";
import { Main } from "./Main";

DatoCmsPlugin.init((plugin: Plugin) => {
  plugin.startAutoResizer();

  const container = document.createElement("div");
  document.body.appendChild(container);

  render(
    <WithPluginContext plugin={plugin}>
      <Main />
    </WithPluginContext>,
    container
  );
});
