'use client'

import {ElementsType, FormElement, FormElementInstance} from "@/components/FormElements";
import {MdTextFields} from "react-icons/md";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeHolder: "value here"
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50)
});

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
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

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

function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>
            <Input placeholder={element.extraAttributes.placeHolder}></Input>

            {element.extraAttributes.helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>)}
        </div>
    );
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label: values.label,
                helperText: values.helperText,
                placeHolder: values.placeHolder,
                required: values.required
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
                <FormField control={form.control} name="label" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}/>
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br/> It will be displayed above the field
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>

                <FormField control={form.control} name="placeHolder" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>PlaceHolder</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}/>
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>

                <FormField control={form.control} name="helperText" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Helper Text</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}/>
                            </FormControl>
                            <FormDescription>
                                The helper text if the field. <br/>
                                It will be displayed below the field
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>

                <FormField control={form.control} name="required" render={({field}) =>
                    (
                        <FormItem className="flex items-center justify-between rounded-lg-border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    The helper text if the field. <br/>
                                    It will be displayed below the field
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>
            </form>
        </Form>
    );
}