"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { QuestionsTableViewOptions } from "@/app/questions/components/questions-table-view-options";
import { questionDificulty, questionStatus } from "@/app/questions/data/data";
import {DataTableFacetedFilter} from "@/app/questions/components/data-table-faceted-filter";

interface  QuestionsTableToolbarProps<TData> {
    table: Table<TData>
}

export function QuestionTableToolbar<TData>({table}:QuestionsTableToolbarProps<TData>){
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter questions..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={questionStatus}
                    />
                )}
                {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Difficuly"
                        options={questionDificulty}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <QuestionsTableViewOptions table={table} />
        </div>
    )
}