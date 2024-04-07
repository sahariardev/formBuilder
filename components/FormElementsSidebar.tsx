import React from "react";
import SidebarBtnElement from "@/components/SidebarBtnElement";
import {FormElements} from "@/components/FormElements";

function FormElementsSidebar() {
    return (<div>
        Elements
        <SidebarBtnElement formElement={FormElements.TextField}/>
    </div>);
}

export default FormElementsSidebar;