"use client";

import { useEffect, useState } from "react";
import { advocatesApi } from "@/app/services/api/advocate";
import { Advocate } from "@/app/services/api/types";
import Loading  from "@/app/components/loading";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")


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

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
      <div style={{margin: "24px"}}>
          <h1>Solace Advocates</h1><br/><br/>
          <div>
              <p>Search</p>
              <input style={{border: "1px solid black"}} onChange={onChange}/>
              <button onClick={onClick}>Search</button>
          </div>
          <div>
              <table>
                  <thead>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>City</th>
                      <th>Degree</th>
                      <th>Specialties</th>
                      <th>Years of Experience</th>
                      <th>Phone Number</th>
                  </thead>
                  {isLoading ? (
                      <Loading size="medium"/>
                  ) : (
                      <tbody>
                        {filteredAdvocates.map((advocate, index) => {
                          return (
                              <tr key={advocate.id || index}>
                                  <td>{advocate.firstName}</td>
                                  <td>{advocate.lastName}</td>
                                  <td>{advocate.city}</td>
                                  <td>{advocate.degree}</td>
                                  <td>
                                      {advocate.specialties.map((s, index) => (
                                          <div key={index}>{s}</div>
                                      ))}
                                  </td>
                                  <td>{advocate.yearsOfExperience}</td>
                                  <td>{advocate.phoneNumber}</td>
                              </tr>
                          );
                      })}
                      </tbody>
                  )}
              </table>
            </div>
          </div>
      );
}
