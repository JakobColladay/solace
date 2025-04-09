"use client";

import { useEffect, useState } from "react";
import { advocatesApi } from "@/app/services/api/advocate";
import { Advocate } from "@/app/services/api/types";
import Loading  from "@/app/components/loading";
import { formatPhoneNumber } from "@/app/utils/formatters";
import ErrorMessage from "@/app/components/error";
import SimplePagination from "@/app/components/pagination";
import { PaginationInfo } from "@/app/types";


export default function Home() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState("")
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });


    // Function to fetch advocates with pagination and optional search
    const fetchAdvocates = async (page: number, searchTerm: string = "") => {
        setIsLoading(true);

        try {
            const response = await advocatesApi.getAdvocatesWithPagination({
                page,
                limit: pagination.itemsPerPage,
            });

            if (response.error) {
                throw new Error(response.error);
            }

            if (!response.data) {
                throw new Error("No data returned");
            }

            // Update state with the fetched data
            setAdvocates(response.data.advocates);
            setFilteredAdvocates(response.data.advocates)
            setPagination(response.data.pagination);
            // Clear error if successful
            setError("");

            // Show error if no results found with search
            if (response.data.advocates.length === 0) {
                setError("No advocates found matching your search criteria.");
            }
        } catch (err) {
            console.error("Failed to fetch advocates:", err);
            setError(err instanceof Error ? err.message : "Failed to load advocates");
            setAdvocates([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial data load
    useEffect(() => {
        fetchAdvocates(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchAdvocates(newPage, searchTerm);
        }
    };

    const onClick = () => {
        // If search term is empty, show all advocates
        if (!searchTerm.trim()) {
            setFilteredAdvocates(advocates);
            return;
        }

        // Convert search term to lowercase once
        const searchTermLower = searchTerm.toLowerCase().trim();

        const filteredAdvocates = advocates.filter((advocate) => {
            // Create an array of fields to search through
            const searchableFields = [
                advocate.firstName.toLowerCase(),
                advocate.lastName.toLowerCase(),
                advocate.city.toLowerCase(),
                advocate.degree.toLowerCase(),
                advocate.yearsOfExperience.toString()
            ];

            // Check if any of the main fields match
            if (searchableFields.some(field => field.includes(searchTermLower))) {
                return true;
            }

            // Only check specialties if the main fields didn't match
            return advocate.specialties.some(specialty =>
                specialty.toLowerCase().includes(searchTermLower)
            );
        });

        setFilteredAdvocates(filteredAdvocates);
    };

    return (
         error !== "" ? <ErrorMessage message={error} /> : (
            <div className="m-6">
                <h1 className="text-2xl font-bold mb-6">Solace Advocates</h1>

                <div className="mb-6 flex items-center gap-2">
                    <input
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search advocates..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={onClick}
                    >
                        Search
                    </button>
                </div>

                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">First
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Degree</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Specialties</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Years
                                of Experience
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Phone
                                Number
                            </th>
                        </tr>
                        </thead>
                        {isLoading ? (
                            <tbody>
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    <Loading size="medium"/>
                                </td>
                            </tr>
                            </tbody>
                        ) : (
                            <tbody className="divide-y divide-gray-200">
                            {filteredAdvocates.map((advocate, index) => (
                                <tr key={advocate.id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{advocate.firstName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{advocate.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{advocate.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{advocate.degree}</td>
                                    <td className="px-6 py-4">
                                        {advocate.specialties.map((s, index) => (
                                            <span key={index}
                                                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                                                {s}
                                             </span>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{advocate.yearsOfExperience}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatPhoneNumber(advocate.phoneNumber)}</td>
                                </tr>
                            ))}
                            </tbody>
                        )}
                    </table>
                </div>

                <SimplePagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        )
    );
}
