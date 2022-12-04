import { Operation, createPatch } from "rfc6902";

export class PatchHelper {
  public static createPatch(original: any, updated: any): Operation[] {
    const patch = createPatch(original, updated);
    return (patch && (patch.length > 0)) ? patch : null;
  }
}