import {Button} from "@/components/ui/button";
import {HiSaveAs} from "react-icons/hi";
import useDesigner from "@/components/hooks/useDesigner";
import {UpdateFormContent} from "@/actions/form";
import {toast} from "@/components/ui/use-toast";
import {useTransition} from "react";
import {FaSpinner} from "react-icons/fa";

function SaveFormBtn({id}:{id:number}) {
    const {elements} = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
            toast({
                title: "Success",
                description: "Your forms hase been  saved"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            });
        }
    }

    return <Button variant="outline" className="gap-2" disabled={loading} onClick={() => {
        startTransition(updateFormContent)
    }}>
        <HiSaveAs className="h-4 w-4"/>
        Save
        {loading && <FaSpinner className="animate-spin"/>}
    </Button>
}

export default SaveFormBtn;