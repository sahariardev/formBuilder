'use client'

import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
function ErrorPage({error} : {error: Error}) {
    useEffect(() => {

    }, [error]);

    return (
        <div className="flex w-full h-full flex-col items-center justify-center">
           <h2 className="text-destructive text-4xl gap-4">Something went wrong!</h2>
            <Button asChild>
                <Link href="/">Go back to home</Link>
            </Button>
        </div>
    );
}

export default ErrorPage;