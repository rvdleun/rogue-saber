export interface IPropertyHandler {
    component: string;
    options?: Object;
}
export interface ITextFieldHandler extends IPropertyHandler {
    coomponent: "TextField";
    options: ITextFieldOptions;
}
interface ITextFieldOptions {
}
export interface IRangeHandler extends IPropertyHandler {
    coomponent: "Range";
    options: IRangedOptions;
}
interface IRangedOptions {
    min: number;
    max: number;
}
export {};
