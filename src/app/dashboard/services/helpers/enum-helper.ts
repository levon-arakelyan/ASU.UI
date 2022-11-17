import { SelectItemModel } from "src/app/core/models/select-item-model";

export class EnumHelper {
  public static parseToSelectItems(e: any): SelectItemModel[] {
    return Object.values(e).map((name, i) => new SelectItemModel(name.toString(), i))
  }

  public static parseToValuesArray(e: any): string[] {
    return Object.values(e).map(name => name.toString());
  }
}