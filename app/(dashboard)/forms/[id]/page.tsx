import React, {ReactNode} from "react";
import {GetFormById, GetFormWithSubmissions} from "@/actions/form";
import VisitBtn from "@/components/VisitBtn";
import FormLinkShare from "@/components/FormLinkShare";
import {LuView} from "react-icons/lu";
import {StatsCard} from "@/app/(dashboard)/page";
import {ElementsType, FormElementInstance} from "@/components/FormElements";
import {element} from "prop-types";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDistance} from "date-fns/formatDistance";

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

            <div className="container pt-10">
                <SubmissionTable id={form.id}/>
            </div>
        </>
    );
}

export default FormPage;
type Row = { [key: string]: string } & { submittedAt: Date };

async function SubmissionTable({id}: { id: number }) {
    const form = await GetFormWithSubmissions(id);

    if (!form) {
        throw new Error("form not found");
    }

    const formElements = JSON.parse(form.content) as FormElementInstance[];
    const columns: {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
    }[] = [];

    formElements.forEach(element => {
        switch (element.type) {
            case "TextField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label,
                    required: element.extraAttributes?.required,
                    type: element.type
                });
                break;
            default:
                break;
        }
    });

    const rows: Row[] = [];
    form.FormSubmissions.forEach(submission => {
        const content = JSON.parse(submission.content);

        rows.push({
            ...content,
            submittedAt: submission.createdAt
        });
    });

    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submission</h1>
            <div className="">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(column => (
                                <TableHead key={column.id} className="uppercase">
                                    {column.label}
                                </TableHead>
                            ))}

                            <TableHead>Submitted at</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    {
                                        columns.map((column) => (
                                            <RowCell
                                                key={column.id}
                                                type={column.type}
                                                value={row[column.id]}
                                            />
                                        ))
                                    }
                                    <TableCell className="text-muted-foreground text-right">
                                        {
                                            formatDistance(row.submittedAt, new Date(), {addSuffix: true})
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

function RowCell({type, value}: { type: ElementsType, value: string }) {
    let node: ReactNode = value;

    return <TableCell>{node}</TableCell>
}