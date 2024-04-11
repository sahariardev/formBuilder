import React from "react";
import {GetFormById} from "@/actions/form";
import VisitBtn from "@/components/VisitBtn";
import FormLinkShare from "@/components/FormLinkShare";
import {LuView} from "react-icons/lu";
import {StatsCard} from "@/app/(dashboard)/page";

async function FormPage({params}: { params: { id: String } }) {
    const {id} = params;
    const form = await GetFormById(Number(id));

    if (!form) {
        throw new Error("Form not found");
    }


    const {visits, submissions} = form;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;


    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                    <VisitBtn shareUrl={form.shareURL}/>
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareUrl={form.shareURL}/>
                </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                <StatsCard
                    title="Total Visits"
                    icon={<LuView className="text-blue-600"/>}
                    helperText="All time form visits"
                    value={visits.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-blue-600"
                />

                <StatsCard
                    title="Total Submissions"
                    icon={<LuView className="text-yellow-600"/>}
                    helperText="All time form submission"
                    value={submissions.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-yellow-600"
                />

                <StatsCard
                    title="Submission rate"
                    icon={<LuView className="text-green-600"/>}
                    helperText="Visits that result in form submission"
                    value={submissionRate.toLocaleString() + "%" || ""}
                    loading={false}
                    className="shadow-md shadow-green-600"
                />

                <StatsCard
                    title="Bounce rate"
                    icon={<LuView className="text-red-600"/>}
                    helperText="Visits that result in form submission"
                    value={bounceRate.toLocaleString() + "%" || ""}
                    loading={false}
                    className="shadow-md shadow-red-600"
                />
            </div>
        </>
    );
}

export default FormPage;