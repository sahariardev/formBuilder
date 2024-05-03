'use client'

import {ElementsType, FormElement, FormElementInstance, submitFunction} from "@/components/FormElements";
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
import {BsFillCalendarDateFill} from "react-icons/bs";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns/format";
import {Calendar} from "@/components/ui/calendar";

const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date field",
    helperText: "Pick a date",
    required: false,
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false)
});

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <BsFillCalendarDateFill className={clasNames}/>,
        label: "Date Field"
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

            <Button variant={"outline"} className={"w-full justify-start text-left font-normal"}>
                <CalendarIcon/>
                <span>Pick a date</span>
            </Button>

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
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label
                className={cn(error && "text-red-500")}>{element.extraAttributes.label} {element.extraAttributes.required && "*"}</Label>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"}
                            className=
                                {cn("w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground",
                                    error && "border-red-500"
                                )}>
                        <CalendarIcon/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus selected={date} onSelect={(date) => {
                        setDate(date);

                        if (!submitValue) return;
                        const value = date?.toUTCString() || "";
                        const valid = DateFieldFormElement.validate(element, value);
                        setError(!valid);
                        submitValue(element.id, value);

                    }}></Calendar>
                </PopoverContent>
            </Popover>

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