"use client"

import {FormElementInstance} from "@/components/FormElements";
import {createContext, ReactNode, useState} from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement : (index:number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
}

export const DesignerContext = createContext<DesignerContextType | null> (null);

export default function DesignerContextProvider({children}:{children:ReactNode}) {

    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        })
    }

    const removeElement = (id:string) => {
        setElements((prev) => prev.filter((elem) => elem.id !== id));
    }

    return <DesignerContext.Provider value={{
        elements:elements,
        addElement: addElement,
        removeElement: removeElement
    }}>{children}</DesignerContext.Provider>;
}