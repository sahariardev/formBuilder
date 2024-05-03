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
import {RxDropdownMenu} from "react-icons/rx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {toast} from "@/components/ui/use-toast";

const type: ElementsType = "SelectField";

const extraAttributes = {
    label: "Select field",
    helperText: "Helper text",
    required: false,
    placeHolder: "value here",
    options: []
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    options: z.array(z.string()).default([])
});

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <RxDropdownMenu className={clasNames}/>,
        label: "Select Field"
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
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={element.extraAttributes.placeHolder}/>
                </SelectTrigger>
            </Select>

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

            <Select defaultValue={value} onValueChange={(value) => {
                setValue(value);
                if (!submitValue) return;
                const valid = SelectFieldFormElement.validate(element, value);
                setError(!valid);
                submitValue(element.id, value);
            }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={element.extraAttributes.placeHolder}/>
                </SelectTrigger>
                <SelectContent>
                    {element.extraAttributes.options.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {element.extraAttributes.helperText && (
                <p className={cn('text-muted-foreground text-[0.8rem]', error && "text-red-500")}>{element.extraAttributes.helperText}</p>)}
        </div>
    );
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {updateElement, setSelectedElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onSubmit",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
            options: element.extraAttributes.options
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
                options: values.options
            }
        });

        toast({
            title: "Success",
            description: "Properties saved successfully"
        });

        setSelectedElement(null);
    }

    return (
        <Form {...form}>
            <form action=""
                  onSubmit={form.handleSubmit(applyChanges)}
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

                <Separator/>
                <FormField control={form.control} name="options" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Options</FormLabel>
                            <div className="flex justify-between items-center">
                                <FormLabel>Options</FormLabel>
                                <Button variant={"outline"} className={"gap-2"} onClick={e => {
                                    e.preventDefault();
                                    form.setValue("options", field.value.concat("New option"))

                                }}>
                                    <AiOutlinePlus/>
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    form.watch("options").map((option, index) => (
                                        <div key={index} className="flex items-center justify-between gap-1">
                                            <Input
                                                placeholder=""
                                                value={option}
                                                onChange={(e) => {
                                                    field.value[index] = e.target.value;
                                                    field.onChange(field.value)
                                                }}
                                            />
                                            <Button variant={"ghost"}
                                                    size={"icon"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const newOptions = [...field.value];
                                                        newOptions.splice(index, 1);
                                                        field.onChange(newOptions)
                                                    }}
                                            >
                                                <AiOutlineClose/>
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>
                            <FormDescription>
                                The helper text if the field. <br/>
                                It will be displayed below the field
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>

                <Separator/>
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
                <Separator/>
                <Button className="w-full" type="submit">
                    Save
                </Button>
            </form>
        </Form>
    );
}