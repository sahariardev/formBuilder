import React from "react";
import {TextFieldFormElement} from "@/components/fields/TextField";
import {TitleFieldFormElement} from "@/components/fields/TitleField";
import {SubtitleFieldFormElement} from "@/components/fields/SubTitleField";
import {ParagraphFieldFormElement} from "@/components/fields/ParagraphField";
import {SeparatorFieldFormElement} from "@/components/fields/SeparatorField";
import {SpacerFieldFormElement} from "@/components/fields/SpacerField";
import {NumberFieldFormElement} from "@/components/fields/NumberField";
import {DateFieldFormElement} from "@/components/fields/DateField";
import {SelectFieldFormElement} from "@/components/fields/SelectField";

export type ElementsType =
    "TextField"
    | "TitleField"
    | "SubtitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"
    | "NumberField"
    | "TextAreaField"
    | "DateField"
    | "SelectField";

export type submitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: (clasNames: string) => any;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;

    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean,
        defaultValue?: string
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;

    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
    id: string,
    type: ElementsType;
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubtitleField: SubtitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement
}