import React from "react";
import {TextFieldFormElement} from "@/components/fields/TextField";

export type ElementsType = "TextField";

export type FormElement  = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: (clasNames:string) => any;
        label: string;
    };

    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
};

export type FormElementInstance = {
    id: string,
    type: ElementsType;
    extraAttributes?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType] : FormElement
}
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement
}