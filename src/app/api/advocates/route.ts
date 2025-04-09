import { NextRequest, NextResponse } from "next/server";
import {advocateData} from "@/db/seed/advocates";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const offset = (page - 1) * limit;

    const allAdvocates = advocateData

    const sortedAdvocates = allAdvocates.sort((a, b) => {
      const lastNameComparison = a.lastName.localeCompare(b.lastName);
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }
      return a.firstName.localeCompare(b.firstName);
    });

    // Apply pagination manually
    const advocatesList = sortedAdvocates.slice(offset, offset + limit);

    const totalItems = allAdvocates.length

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      advocates: advocatesList,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return NextResponse.json(
        { error: "Failed to fetch advocates" },
        { status: 500 }
    );
  }
}
