'use client'

import {ElementsType, FormElement, FormElementInstance} from "@/components/FormElements";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {LuHeading1} from "react-icons/lu";
import {RiSeparator} from "react-icons/ri";
import {Separator} from "@/components/ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type
    }),
    designerBtnElement: {
        icon: (clasNames) => <RiSeparator className={clasNames}/>,
        label: "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
}


function DesignerComponent() {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground"> Separator field</Label>
            <Separator/>
        </div>
    );
}

function FormComponent() {
    return (
        <Separator/>
    );
}

function PropertiesComponent() {
    return (
        <div>No properties for this element</div>
    );
}