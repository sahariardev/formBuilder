import React from "react";
import useDesigner from "@/components/hooks/useDesigner";
import {FormElements} from "@/components/FormElements";
import {Button} from "@/components/ui/button";
import {AiOutlineClose} from "react-icons/ai";
import {Separator} from "@/components/ui/separator";

function PropertiesFormSidebat() {
    const {selectedElement, setSelectedElement} = useDesigner();

    if (!selectedElement) {
        return null;
    }

    const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-foreground/70">
                    Element properties
                </p>
            </div>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                    setSelectedElement(null);
                }}
            >
                <AiOutlineClose/>
            </Button>
            <Separator />
            <PropertiesForm elementInstance={selectedElement}/>
        </div>
    );
}

export default PropertiesFormSidebat;