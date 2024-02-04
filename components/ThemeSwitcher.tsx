'use client';

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SunIcon} from "@radix-ui/react-icons";

function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div>
            <Tabs>
              <TabsList className="border">
                  <TabsTrigger value="light" onClick={() => setTheme("light")}>
                     <SunIcon className="h-[1.2rem] w-[1.2rem]"/>
                  </TabsTrigger>
              </TabsList>
            </Tabs>
        </div>
    );
}

export default ThemeSwitcher;
