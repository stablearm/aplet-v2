"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronUp, ChevronDown, Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./empty-state";
import { Pagination } from "./pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchKey?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  pageSize?: number;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  searchPlaceholder = "جستجو...",
  searchKey,
  emptyTitle = "داده‌ای موجود نیست",
  emptyDescription,
  emptyIcon,
  pageSize = 10,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize } },
    state: { sorting, globalFilter },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-11 w-72 rounded-xl" />
        <div className="rounded-2xl border border-border/30 bg-surface shadow-sm overflow-hidden">
          <div className="p-5 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0 && !globalFilter) {
    return (
      <div className="rounded-2xl border border-border/30 bg-surface shadow-sm p-12">
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full h-11 rounded-xl border border-border/40 bg-surface pr-10 pl-9 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/20 focus:border-[#5B5FEF]/40 transition-all duration-200"
          />
          {(table.getState().globalFilter as string) && (
            <button
              onClick={() => table.setGlobalFilter("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-muted/50 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-border/30 bg-surface shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border/30">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-12 text-[11px] font-bold uppercase tracking-wider text-text-tertiary/70",
                      header.column.getCanSort() && "cursor-pointer select-none hover:text-text-secondary"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="h-3 w-3 text-[#5B5FEF]" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="h-3 w-3 text-[#5B5FEF]" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3 opacity-20" />
                          )}
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-border/20 last:border-0 hover:bg-[#5B5FEF]/[0.02] transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <EmptyState title="نتیجه‌ای یافت نشد" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      )}
    </div>
  );
}
