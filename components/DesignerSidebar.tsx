import {FormElements} from "@/components/FormElements";
import SidebarBtnElement from "@/components/SidebarBtnElement";
import useDesigner from "@/components/hooks/useDesigner";
import FormElementsSidebar from "@/components/FormElementsSidebar";
import PropertiesFormSidebat from "@/components/PropertiesFormSidebat";

function DesignerSidebar() {
    const {selectedElement} = useDesigner();
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow
        gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {!selectedElement && <FormElementsSidebar/>}
            {selectedElement && <PropertiesFormSidebat />}
        </aside>
    );
}

export default DesignerSidebar;