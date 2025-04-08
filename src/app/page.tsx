"use client";

import { useEffect, useState } from "react";
import { advocatesApi } from "@/app/services/api/advocate";
import { Advocate } from "@/app/services/api/types";
import Loading  from "@/app/components/loading";
import {formatPhoneNumber} from "@/app/utils/formatters";
import ErrorMessage from "@/app/components/error";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        const fetchAdvocates = async () => {
            setIsLoading(true);

            const { data, error } = await advocatesApi.getAdvocates();

            if (error) {
                setError(error);
            } else if (data) {
                setAdvocates(data);
                setFilteredAdvocates(data);
            }

            setIsLoading(false);
        };

        fetchAdvocates();
    }, []);

    const onClick = () => {
        const filteredAdvocates = advocates.filter((advocate) => {
            return (
                advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                advocate.specialties.some(specialty =>
                    specialty.toLowerCase().includes(searchTerm.toLowerCase())
                ) ||
                advocate.yearsOfExperience.toString().includes(searchTerm)
            );
        });

        // Set the filtered list, not the original list
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
            </div>
        )
    );
}
