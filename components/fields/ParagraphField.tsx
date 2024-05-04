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
import {BsTextParagraph} from "react-icons/bs";
import {Textarea} from "@/components/ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
    text: "Text Here"
}

const propertiesSchema = z.object({
    text: z.string().min(2).max(500)
});

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <BsTextParagraph className={clasNames}/>,
        label: "Paragraph Field"
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
    const {text} = element.extraAttributes;

    return (
        <p className="text-xl"> {text} </p>
    );
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            text: element.extraAttributes.text
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text: values.text
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
                <FormField control={form.control} name="text" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} onKeyDown={(e) => {
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