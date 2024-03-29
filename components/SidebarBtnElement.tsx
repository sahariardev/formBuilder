import {FormElement} from "@/components/FormElements";
import React from "react";
import {Button} from "@/components/ui/button";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "@/lib/utils";
function SidebarBtnElement({formElement}:{formElement:FormElement}) {
    const {label, icon} = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true
        }
    });

    const buttonClassNames = cn("flex flex-col grap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring2 ring-primary");

    return <Button
             ref={draggable.setNodeRef}
        variant={"outline"} className={buttonClassNames}
        {...draggable.listeners}
        {...draggable.attributes}
    >
        {icon("h-8 w-8 text-primary cursor-grab")}
        <p className="text-xs">{label}</p>
    </Button>
}

export function SidebarBtnElementOverlay({formElement}:{formElement:FormElement}) {
    const {label, icon} = formElement.designerBtnElement;

    const buttonClassNames = "flex flex-col grap-2 h-[120px] w-[120px] cursor-grab";

    return <Button variant={"outline"} className={buttonClassNames}>
        {icon("h-8 w-8 text-primary cursor-grab")}
        <p className="text-xs">{label}</p>
    </Button>
}

export default SidebarBtnElement;