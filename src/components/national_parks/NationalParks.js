import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useParks } from "../../hooks/useParks";
import { useState } from "react";

function NationalParks() {

    const [nationalParks, locations, types] = useParks();
    const [searchType, setSearchType] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    const handleSearchType = (event) => {
        setSearchType(event.target.value)
        setSearchResults([])
        setSelectedFilter("")
    }

    const handleSearch = (event) => {
        const selected = event.target.value
        setSelectedFilter(selected)
        let results = []
        if(searchType === "Location"){
            results = nationalParks.filter((park, idx) => {
                return park.State === selected;
            })
        }

        if(searchType === "Type"){
            results = nationalParks.filter((park, idx) => {
                return park.LocationName.toLowerCase().includes(selected.toLowerCase());
            })
        }

        setSearchResults(results)

    }

    const generateOptions = () => {
        let options = []

        if(searchType === "Location"){
            return locations.map((location, idx) => {
                return <option key={idx} value={location}>{location}</option>
            })
        }

        if(searchType === "Type"){
            options = types.map((type, idx) => {
                return <option key={idx} value={type}>{type}</option>
            })
        }

        return options
    }

    return (
        <div className="NationalParks bg-light">
            <h1>National Parks Search</h1>

            <Container className="py-4">

                <Form.Group className="d-flex justify-content-center">
                    <div className="fw-bold mx-2">Search By:</div>
                    <Form.Check // prettier-ignore
                        type="radio"
                        className="pe-2"
                        id="searchType"
                        name="searchType"
                        value="Location"
                        label={`Location`}
                        onChange={handleSearchType}
                    />
                    <Form.Check // prettier-ignore
                        type="radio"
                        id="searchType"
                        name="searchType"
                        value="Type"
                        label={`Type`}
                        onChange={handleSearchType}
                    />
                </Form.Group>

                {searchType && (
                    <Form.Select value={selectedFilter} className="w-25 mx-auto mt-2" onChange={handleSearch}>
                        <option value="" className="text-center">--Choose a Park {searchType}--</option>
                        {generateOptions()}
                    </Form.Select>
                )}

                <hr />
                
                {searchResults.length > 0 ? (
                    <Table striped bordered hover className="mt-4" variant="dark">
                    <thead>
                        <tr>
                            <th className="text-nowrap">Location ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{result.LocationID}</td>
                                    <td>{result.LocationName}</td>
                                    <td>
                                        <div>{result.Address}</div>
                                        <div>{result.City}, {result.State} {result.ZipCode}</div>
                                    </td>
                                    <td className="text-nowrap">
                                        <span className="fw-bold">Phone: </span>{result.Phone || "N/A"}
                                        <br/>
                                        <span className="fw-bold">Fax: </span>{result.Fax || "N/A"}
                                    </td>
                                    <td className="text-nowrap">
                                        {result.Visit ? <a href={result.Visit} target="_blank">{result.Visit}</a> : "N/A"}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>

                ): <h3 className="text-center">Search for National Parks to view results</h3>}
            </Container>
        </div>
    )
}

export default NationalParks;