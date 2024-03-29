'use client'

import {ElementsType, FormElement} from "@/components/FormElements";
import {MdTextFields} from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
          label: "Text field",
          helperText: "Helper text",
          required: false,
          placeHolder: "value here"
        }
    }),
    designerBtnElement: {
        icon: (clasNames) => <MdTextFields className={clasNames}/>,
        label: "Text Field"
    },
    designerComponent: () => <div>Designer Component</div>,
    formComponent: () => <div>Designer Component</div>,
    propertiesComponent: () => <div>Designer Component</div>
}