import React, {useContext} from "react";
import {useForm} from "react-hook-form";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import {AuthContext} from "../../contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import {ImSpinner9} from "react-icons/im";
import '../../assets/scss/react/_login.scss'
function Login() {
  const { register, handleSubmit } = useForm();
  const {signIn, isLoading, loginError} = useContext(AuthContext || null )

  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <>
      <Col lg="4" md="5">
        <Card className="bg-secondary shadow loginMargin border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted loginContainer text-center">
              <img src={require("assets/img/brand/whydorezise2.png")} />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit(handleSignIn)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    {...register('email')}
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    {...register('password')}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>

              <div className={`text-center buttonContainer`}>
                {loginError && <span className={'spanError'}>Login ou senha incorretos</span>}
                <Button className={`my-4 loginButton`} color="primary" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <ImSpinner9 size={20} />
                      Sign In
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
