import {Button} from "@/components/ui/button";
import {MdOutlinePublish} from "react-icons/md";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {FaIcons, FaSpinner} from "react-icons/fa";
import {useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {publishFormInDb} from "@/actions/form";
import {useRouter} from "next/navigation";

function PublishFormBtn({id}: { id: number }) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {

            await publishFormInDb(id);
            toast({
                title: "Success",
                description: "Your forms is now available to the public"
            });

            router.refresh();

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong"
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <MdOutlinePublish className="h-4 w-4"/>
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing form you cannot edit form
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={(e) => {
                        e.preventDefault();
                        startTransition(publishForm);
                    }}>Proceed {loading && <FaSpinner className="animate-spin"/>}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default PublishFormBtn;