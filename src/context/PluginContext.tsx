import React, { useCallback, useContext, useEffect, useState } from "react";
import { Plugin } from "../types/Plugin";

type Config = Plugin["parameters"]["global"] & Plugin["parameters"]["instance"];

type ContextType = {
  configuration: Config;
  value: string;
  setValue: (newValue: string) => void;
};
const PluginContext = React.createContext<ContextType>({
  //@ts-ignore
  configuration: {},
});

export const usePlugin = () => useContext(PluginContext);

export const WithPluginContext: React.FC<{ plugin: Plugin }> = ({
  plugin,
  children,
}) => {
  const [value, _setValue] = useState<Omit<ContextType, "setValue">>({
    configuration: {
      ...plugin.parameters.global,
      ...plugin.parameters.instance,
    },
    value: plugin.getFieldValue(plugin.fieldPath) as string,
  });

  useEffect(() => {
    return plugin.addFieldChangeListener(plugin.fieldPath, (newValue) => {
      _setValue({
        value: newValue as string,
        configuration: {
          ...plugin.parameters.global,
          ...plugin.parameters.instance,
        },
      });
    });
  }, []);

  const setValue = useCallback(
    (newValue: string) => plugin.setFieldValue(plugin.fieldPath, newValue),
    [plugin.fieldPath]
  );

  return (
    <PluginContext.Provider value={{ ...value, setValue }}>
      {children}
    </PluginContext.Provider>
  );
};
