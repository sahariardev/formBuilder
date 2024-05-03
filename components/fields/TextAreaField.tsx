'use client'

import {ElementsType, FormElement, FormElementInstance, submitFunction} from "@/components/FormElements";
import {MdTextFields} from "react-icons/md";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {cn} from "@/lib/utils";
import {BsTextareaResize} from "react-icons/bs";
import {Textarea} from "@/components/ui/textarea";
import {Slider} from "@/components/ui/slider";

const type: ElementsType = "TextAreaField";

const extraAttributes = {
    label: "Text area",
    helperText: "Helper text",
    required: false,
    placeHolder: "value here",
    rows: 3
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10)
});

export const TextAreaFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <BsTextareaResize className={clasNames}/>,
        label: "TextArea Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;

        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }

        return true;
    }
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
            <Textarea readOnly disabled
                      placeholder={element.extraAttributes.placeHolder}></Textarea>

            {element.extraAttributes.helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>)}
        </div>
    );
}

function FormComponent({elementInstance, submitValue, isInvalid, defaultValue}: {
    elementInstance: FormElementInstance,
    submitValue?: submitFunction
    isInvalid?: boolean,
    defaultValue?: string
}) {
    const element = elementInstance as CustomInstance;
    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label
                className={cn(error && "text-red-500")}>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>
            <Textarea
                rows={element.extraAttributes.rows}
                className={cn(error && "border-red-500")}
                placeholder={element.extraAttributes.placeHolder}
                onBlur={(e) => {
                    if (!submitValue) {
                        return;
                    }
                    const valid = TextAreaFormElement.validate(element, e.target.value);
                    setError(!valid);
                    if (!valid) return;

                    submitValue(element.id, e.target.value);
                }}
                onChange={(e) => setValue(e.target.value)}>

            </Textarea>

            {element.extraAttributes.helperText && (
                <p className={cn('text-muted-foreground text-[0.8rem]', error && "text-red-500")}>{element.extraAttributes.helperText}</p>)}
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
            placeHolder: element.extraAttributes.placeHolder,
            rows: element.extraAttributes.rows
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
                required: values.required,
                rows: values.rows
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

                <FormField control={form.control} name="rows" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Rows {form.watch("rows")}</FormLabel>
                            <FormControl>
                                <Slider defaultValue={[field.value]} max={10} min={1} step={1}
                                        onValueChange={(value) => {
                                            field.onChange(value[0])
                                        }}/>
                            </FormControl>
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