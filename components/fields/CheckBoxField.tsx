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
import {IoMdCheckbox} from "react-icons/io";
import {Checkbox} from "@/components/ui/checkbox";

const type: ElementsType = "CheckBoxField";

const extraAttributes = {
    label: "CheckBox field",
    helperText: "Helper text",
    required: false
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false)
});

export const CheckBoxFieldFormEmelemnt: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <IoMdCheckbox className={clasNames}/>,
        label: "CheckBox Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;

        if (element.extraAttributes.required) {
            return currentValue === "true";
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
    const id = `checkbox-${element.id}`;
    return (
        <div className="flex items-top space-x-2">
            <Checkbox id={id}/>
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>
                <Input readOnly disabled placeholder={element.extraAttributes.placeHolder}></Input>

                {element.extraAttributes.helperText && (
                    <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>)}
            </div>
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
    const [value, setValue] = useState<boolean>(defaultValue === 'true');
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid]);


    const id = `checkbox-${element.id}`;
    return (
        <div className="flex items-top space-x-2">
            <Checkbox id={id}
                      checked={value}
                      className={cn(error && "border-red-500")}
                      onCheckedChange={(checked) => {
                          let value = false;
                          if (checked === true) value = true;
                          setValue(value);

                          if (!submitValue) return;
                          const stringValue = value ? "true" : "false";
                          const valid = CheckBoxFieldFormEmelemnt.validate(element, stringValue);
                          setError(!valid);
                          submitValue(element.id, stringValue);
                      }}/>
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}
                       className={cn(error && "text-red-500")}>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>
                <Input readOnly disabled placeholder={element.extraAttributes.placeHolder}></Input>

                {element.extraAttributes.helperText && (
                    <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{element.extraAttributes.helperText}</p>)}
            </div>
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
            required: element.extraAttributes.required
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