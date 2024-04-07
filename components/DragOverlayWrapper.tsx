
import React, {useState} from "react";
import {Active, DragCancelEvent, DragOverlay, DragStartEvent, useDndMonitor} from "@dnd-kit/core";
import {SidebarBtnElementOverlay} from "@/components/SidebarBtnElement";
import {ElementsType, FormElements} from "@/components/FormElements";
import useDesigner from "@/components/hooks/useDesigner";
function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)
    const {elements} = useDesigner();

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

    if (isSidebarBtnElement) {
        node = <SidebarBtnElementOverlay formElement={FormElements[type]}/>
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);

        if (!element) {
            node = <div>Element not found</div>
        } else {
            const DesignerElementConponent = FormElements[element.type].designerComponent;

            node = <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
                <DesignerElementConponent elementInstance={element}/>
            </div>
        }
    }

    return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;