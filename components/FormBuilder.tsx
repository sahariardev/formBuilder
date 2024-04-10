'use client'
import React, {useEffect} from "react";
import {Form} from "@prisma/client";
import PublishFormBtn from "@/components/PublishFormBtn";
import SaveFormBtn from "@/components/SaveFormBtn";
import PreviewDialogBtn from "@/components/PreviewDialogBtn";
import Designer from "@/components/Designer";
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import useDesigner from "@/components/hooks/useDesigner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import Link from "next/link";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";

function FormBuilder({form}: { form: Form }) {

    const {setElements} = useDesigner();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        const elements = JSON.parse(form.content);
        setElements(elements);
    }, [form, setElements]);

    const shareUrl = `${window.location, origin}/submit/${form.shareURL}`;

    if (form.published) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="max-w-md">
                        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                            Form Published
                        </h1>
                        <h2 className="text-2xl">
                            Share this form
                        </h2>
                        <h3 className="text-xl text-muted-foreground border-b pb-10">
                            Anyone with the link can view and submit the form
                        </h3>
                        <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl}/>
                            <Button className="mt-2 w-full" onClick={() => {
                                navigator.clipboard.writeText(shareUrl);
                                toast({
                                    title: "Copied!",
                                    description: "Link copied to clipboard"
                                });
                            }}/>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={"link"} asChild>
                                <Link href={"/"} className="gap-2">
                                    <BsArrowLeft/>
                                    Go back home
                                </Link>
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={"link"} asChild>
                                <Link href={`/forms/${form.id}`} className="gap-2">
                                    Form details
                                    <BsArrowRight/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                    <span className="text-muted-foreground mr-2">
                        Form:
                    </span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn/>
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id}/>
                                <PublishFormBtn id={form.id}/>
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center
            justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer/>
                </div>
            </main>
            <DragOverlayWrapper/>
        </DndContext>
    );
}

export default FormBuilder;