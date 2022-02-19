import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyCard from "./MyCard";


const App = () => { 
  return (
    <Container fluid className="p-4 bg-primary App">
      <Row>
        <Col md={12} className="offset-md-4 mt-4">
          <MyCard/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
