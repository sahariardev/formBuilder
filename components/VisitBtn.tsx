'use client'

import React from "react";
import {Button} from "@/components/ui/button";

function VisitBtn({shareUrl}: { shareUrl: string }) {
    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    return (
        <Button className="w-[200px]" onClick={()=>{
            window.open(shareUrl, "_blank")
        }}>Visit</Button>
    );
}

export default VisitBtn;