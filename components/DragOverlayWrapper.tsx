
import React, {useState} from "react";
import {Active, DragCancelEvent, DragOverlay, DragStartEvent, useDndMonitor} from "@dnd-kit/core";
import {SidebarBtnElementOverlay} from "@/components/SidebarBtnElement";
import {ElementsType, FormElements} from "@/components/FormElements";
function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)

    useDndMonitor({
        onDragStart(event: DragStartEvent) {
            setDraggedItem(event.active)
        },
        onDragCancel(event: DragCancelEvent) {
            setDraggedItem(null)
        },
        onDragEnd(event: DragCancelEvent) {
            setDraggedItem(null)
        }
    });

    if (!draggedItem) {
        return null;
    }

    let node = <div>No drag </div>;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
    const type = draggedItem.data?.current?.type as ElementsType;

    if(isSidebarBtnElement) {
        node = <SidebarBtnElementOverlay formElement={FormElements[type]}/>
    }

    return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;