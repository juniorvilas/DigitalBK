import React from 'react';
import { render, screen } from '@testing-library/react'
import App from './App'


describe('Verificando se existe os buttons "Criar conta" e "Fazer login', () => {

  it('Verificar se tem tem o button Criar conta', () => {
    render(<App />)
    // const { getByText } = render(<App />)
    const criarConta = screen.getAllByText('Criar conta')
    expect(criarConta).toBeInTheDocument;
  })

  it('Verificar se tem tem o button Fazer login', () => {
    render(<App />)
    // const { getByText } = render(<App />)
    const fazerLogin = screen.getAllByText('Fazer login')
    expect(fazerLogin).toBeInTheDocument;
  })


})



