import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">Sistema Acadêmico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/alunos"
              className={location.pathname === '/alunos' ? 'active' : ''}
            >
              Alunos
            </Nav.Link>
            <Nav.Link
              href="/cadastro-alunos"
              className={location.pathname === '/cadastro-alunos' ? 'active' : ''}
            >
              Cadastro de Alunos
            </Nav.Link>
            <Nav.Link
              href="/turmas"
              className={location.pathname === '/turmas' ? 'active' : ''}
            >
              Turmas
            </Nav.Link>
            <Nav.Link
              href="/inscricoes"
              className={location.pathname === '/inscricoes' ? 'active' : ''}
            >
              Inscrições
            </Nav.Link>
            <Nav.Link
              href="/grupos"
              className={location.pathname === '/grupos' ? 'active' : ''}
            >
              Grupos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
