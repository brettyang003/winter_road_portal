import {Button,Form} from 'react-bootstrap';
import "./styles.css"

function LoginForm() {
    return (
      <Form className="loginForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="h3 pb-3">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted ">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="h3 pb-3">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className = "mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
}

export default LoginForm;