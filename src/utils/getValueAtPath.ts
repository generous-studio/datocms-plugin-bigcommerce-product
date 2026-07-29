/**
 * Resolves a dot-separated path (as provided by `ctx.fieldPath`) inside an
 * object. Fields nested in modular content or single blocks get paths like
 * `blocks.0.product`, so a plain `formValues[fieldPath]` lookup returns
 * `undefined` for them.
 */
export const getValueAtPath = <T = unknown>(
  source: unknown,
  path: string,
): T | undefined =>
  path.split(".").reduce<unknown>((value, key) => {
    if (value === null || typeof value !== "object") {
      return undefined;
    }

    return (value as Record<string, unknown>)[key];
  }, source) as T | undefined;
