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
import {LuHeading1, LuSeparatorHorizontal} from "react-icons/lu";
import {Slider} from "@/components/ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
    height: 20 //px
}

const propertiesSchema = z.object({
    height: z.number().min(5).max(200)
});

export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: (clasNames) => <LuSeparatorHorizontal className={clasNames}/>,
        label: "Spacer Field"
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
        <div className="flex flex-col gap-2 w-full items-center">
            <Label className="text-muted-foreground"> Spacer field: {element.extraAttributes.height}px</Label>
            <LuSeparatorHorizontal className="h-8 w-8"/>
        </div>
    );
}

function FormComponent({elementInstance}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as CustomInstance;
    const {height} = element.extraAttributes;

    return (
        <div style={{height, width: "100%"}}></div>
    );
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            height: element.extraAttributes.title
        }
    });

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height: values.height
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
                <FormField control={form.control} name="height" render={({field}) =>
                    (
                        <FormItem>
                            <FormLabel>Height (px): {form.watch("height")}</FormLabel>
                            <FormControl>
                                <Slider
                                    defaultValue={[field.value]}
                                    min={5}
                                    max={200}
                                    step={1}
                                    onValueChange={(value) => field.onChange(value[0])}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }/>
            </form>
        </Form>
    );
}