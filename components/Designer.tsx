'use client'

import React, {useState} from "react";
import DesignerSidebar from "@/components/DesignerSidebar";
import {DragEndEvent, useDndMonitor, useDraggable, useDroppable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
import {ElementsType, FormElementInstance, FormElements} from "@/components/FormElements";
import useDesigner from "@/components/hooks/useDesigner";
import {idGenerator} from "@/lib/idGenerator";
import {element} from "prop-types";
import {Button} from "@/components/ui/button";
import {BiSolidTrash} from "react-icons/bi";

function Designer() {
    const {elements, addElement} = useDesigner();

    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true
        }
    });

    const classNames = cn('bg-background max-w-[920px] h-full m-auto rounded-xl\n' +
        '            flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto', droppable.isOver && 'ring-2 ring-primary/20')

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            const {active, over} = event;

            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

            if (isDesignerBtnElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator());
                addElement(0, newElement);
            }

            console.log("DRAG END", event);
        }
    });

    return <div className="flex w-full h-full">
        <div className="p-4 w-full">
            <div
                ref={droppable.setNodeRef}
                className={classNames}>
                {
                    !droppable.isOver && elements.length === 0 && (
                        <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                            Drop here
                        </p>
                    )
                }
                {
                    droppable.isOver && elements.length === 0 && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/20">

                            </div>
                        </div>
                    )
                }
                {elements.length > 0 && (
                    <div className="flex flex-col  w-full gap-2 p-4">
                        {
                            elements.map((el) => (
                                <DesignerElementWrapper key={el.id} element={el}/>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
        <DesignerSidebar/>
    </div>;
}

function DesignerElementWrapper({element}: { element: FormElementInstance }) {
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const {removeElement} = useDesigner();
    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true
        }
    });

    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true
        }
    });

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true
        }
    });

    const DesignerElement = FormElements[element.type].designerComponent;

    if (draggable.isDragging) {
        return null
    }

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <div ref={topHalf.setNodeRef}
                 className={cn("absolute w-full h-1/2 rounded-t-md")}></div>
            <div ref={bottomHalf.setNodeRef}
                 className={cn("absolute bottom-0 w-full h-1/2 rounded-b-md")}></div>

            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                            variant={"outline"}
                            onClick={() => {
                                removeElement(element.id)
                            }}
                        >
                            <BiSolidTrash className="h-6 w-6"/>
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
                    </div>
                </>
            )}

            {
                topHalf.isOver && (
                    <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none">

                    </div>
                )
            }

            <div className={cn("flex w-full h-[120px] opacity-100 items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
                mouseIsOver && "opacity-30")}>
                <DesignerElement elementInstance={element}/>
            </div>

            {
                bottomHalf.isOver && (
                    <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none">

                    </div>
                )
            }
        </div>
    );
}

export default Designer;