"use client"

import {FormElementInstance} from "@/components/FormElements";
import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

type DesignerContextType = {
    elements: FormElementInstance[];
    setElements:  Dispatch<SetStateAction<FormElementInstance[]>>;
    addElement : (index:number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement:  Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement: (id: string, element: FormElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType | null> (null);

export default function DesignerContextProvider({children}:{children:ReactNode}) {

    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)
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

    const updateElement = (id:string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements= [...prev];
            const index = newElements.findIndex((el)=> el.id === id);
            newElements[index] = element;

            return newElements;
        })
    }

    return <DesignerContext.Provider value={{
        elements:elements,
        setElements:setElements,
        addElement: addElement,
        removeElement: removeElement,
        selectedElement: selectedElement,
        setSelectedElement: setSelectedElement,
        updateElement: updateElement
    }}>{children}</DesignerContext.Provider>;
}