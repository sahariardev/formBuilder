'use client'

import React from 'react';
import {FormElementInstance, FormElements} from "@/components/FormElements";

function FormSubmitComponent({formUrl, content}: { formUrl: string, content: FormElementInstance[] }) {
    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
            w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                {
                    content.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return <FormElement key={element.id} elementInstance={element}/>
                    })
                }
            </div>
        </div>
    );
}

export default FormSubmitComponent;