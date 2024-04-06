'use client'

import {ElementsType, FormElement, FormElementInstance} from "@/components/FormElements";
import {MdTextFields} from "react-icons/md";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeHolder: "value here"
}

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <MdTextFields className={clasNames}/>,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Designer Component</div>,
    propertiesComponent: () => <div>Designer Component</div>
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>
            <Input readOnly disabled placeholder={element.extraAttributes.placeHolder}></Input>

            {element.extraAttributes.helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>)}
        </div>
    );
}