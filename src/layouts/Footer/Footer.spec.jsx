import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './Footer.jsx'

describe('Testando componente Footer', () => {


    it('Renderizando componente', () => {

        render(<Footer />);

        const componentTitle = screen.getByText('©2022 Digital Booking');
        expect(componentTitle).toBeInTheDocument;
    });

    it('Verificar se a lista de ícones das redes sociais possui as classes informadas', () => {
        
        const footer = render(<Footer />);
        expect(footer.container.classList.contains('.nav .col-md-4 .justify-content-end .list-unstyled .d-flex .mx-2'));
    })

    it('Verificar se tem tem lista com os 4(quatro) ícones das redes sociais', () => {
        
        const footer = render(<Footer />);
        expect(footer.container.classList.contains('.bi-facebook .bi-linkedin .bi-twitter .bi-instagram'));
    })
})