'use client'

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

function VisitBtn({shareUrl}: { shareUrl: string }) {
    const shareLink = `${window.location.origin}/submit/${shareUrl}`;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return;
    }

    return (
        <Button className="w-[200px]" onClick={() => {
            window.open(shareLink, "_blank")
        }}>Visit</Button>
    );
}

export default VisitBtn;