"use client"

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "./ui/button"

function CreateFormBtn() {
    return <Dialog>
        <DialogTrigger asChild>
            <Button>Create New Form</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create Form
                </DialogTitle>
                <DialogDescription>
                    Create a new form to start collecting reponse
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}

export default CreateFormBtn;