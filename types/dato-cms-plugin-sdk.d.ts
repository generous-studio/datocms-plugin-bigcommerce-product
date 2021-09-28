declare module "datocms-plugins-sdk" {
  export type DatoCmsPlugin<
    GlobalConfig extends Record<string, string> = {},
    InstanceConfig extends Record<string, string> = {}
  > = {
    // site
    environment: string;
    // itemType
    // itemTypes
    // fields
    itemId?: string;
    itemStatus: "published" | "draft" | "new";
    isSubmitting: boolean;
    // field
    // currentUser
    disabled: boolean;
    parameters: { global: GlobalConfig; instance: InstanceConfig };
    locale: string;
    fieldPath: FieldPath;
    placeholder: string;
    theme: {
      accentColor: string;
      darkColor: string;
      lightColor: string;
      primaryColor: string;
      semiTransparentAccentColor: string;
    };

    startAutoResizer: () => void;

    getFieldValue: (fieldPath: string) => unknown;

    addFieldChangeListener: (
      fieldPath: string,
      listener: (newValue: unknown) => void
    ) => () => void;
    setFieldValue: (fieldPath: string, value: unknown) => void;

    notice: (message: string) => Promise<unknown>;
    alert: (message: string) => Promise<unknown>;
  };

  export function init<G, I>(
    param: (plugin: DatoCmsPlugin<G, I>) => void
  ): Promise<unknown>;
}
