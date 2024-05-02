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

const type: ElementsType = "TitleField";

const extraAttributes = {
    title: "Title field"
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50)
});

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <LuHeading1 className={clasNames}/>,
        label: "Title Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground"> Title field</Label>
            <p className="text-xl">{element.extraAttributes.title}</p>
        </div>
    );
}

function FormComponent({elementInstance}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as CustomInstance;
    const {title} = element.extraAttributes;

    return (
        <p className="text-xl"> {title} </p>
    );
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            title: element.extraAttributes.title
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title: values.title
            }
        })
    }

    return (
        <Form {...form}>
            <form action=""
                  onBlur={form.handleSubmit(applyChanges)}
                  onSubmit={(e) => {
                      e.preventDefault()
                  }}
                  className="space-y-3">
                <FormField control={form.control} name="title" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>
            </form>
        </Form>
    );
}