import React from 'react';
import { render, screen} from '@testing-library/react'
import LoginForm from './LoginForm'




describe('Testando a tela Iniciar Sessão' , () => {

  it('Verificar se tem E-mail na tela', () => {
    render(<LoginForm />)
    const email = screen.getByText('E-mail')
    expect(email).toBeInTheDocument();
  })

  it('Verificar se tem Senha na tela', () => {
    render(<LoginForm />)
    const senha = screen.getByText('Senha')
    expect(senha).toBeInTheDocument();
  })


  // it('Testando uma simples soma', () => {

  //   const a = 1
  //   const b = 2
  //   const c = 3

  //   expect(a + b).toBe(c)
  // })

  // it('Testando uma multiplicação', () => {
    
  //   const a = 3
  //   const b = 4
  //   const c = 12

  //   expect(a * b).toBe(c)
  // })


})

