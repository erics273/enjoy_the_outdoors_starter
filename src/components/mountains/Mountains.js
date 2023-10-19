import { useState } from "react";
import { useMountains } from "../../hooks/useMountains";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function Mountains() {

    const mountains = useMountains();
    let [selectedMountain, setSelectedMountain] = useState({});

    const handleChange = (event) => {
        let selected = event.target.value;

        if (selected) {
            setSelectedMountain(mountains[event.target.value])
        } else {
            setSelectedMountain({})
        }
    }

    return (
        <div className="Mountains bg-light">
            <h1>Mountains Information</h1>
            <Container className="py-4">

                <Form.Select className="w-25 mx-auto z-3" onChange={handleChange}>
                    <option value="" className="text-center">--Select a Mountain--</option>
                    {mountains.map((mountain, idx) => {
                        return <option key={idx} value={idx}>{mountain.name}</option>
                    })}
                </Form.Select>

                <hr />

            </Container>
            <Container className="pb-4 mountainDetails">
                {selectedMountain.name ? (
                    <Card style={{ width: "335px" }} bg="dark" text="light" className="mx-auto z-3">
                        <Card.Header className="fw-bold text-center">{selectedMountain.name}</Card.Header>
                        <Card.Img variant="top" src={`/mountainImages/${selectedMountain.img}`} />
                        <Card.Body className="text-center">
                            <Card.Text>
                                {selectedMountain.desc}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item variant="dark" >
                                <span className="fw-bold me-2">Elevation:</span>
                                {selectedMountain.elevation} feet.
                            </ListGroup.Item>
                            <ListGroup.Item variant="dark" >
                                <span className="fw-bold me-2">Effort:</span>
                                {selectedMountain.effort}
                            </ListGroup.Item>
                            <ListGroup.Item variant="dark" >
                                <span className="fw-bold me-2">Lat:</span>
                                {selectedMountain.coords.lat}
                                <span className="fw-bold ms-2">Lng:</span>
                                {selectedMountain.coords.lng}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                ) : <h3 className="text-center">Select a Mountain to view details</h3>}
            </Container>
        </div>
    )
}

export default Mountains;