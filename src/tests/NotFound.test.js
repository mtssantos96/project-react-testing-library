import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Contém um heading h2 com o texto Page requested not found 😭', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/xablau');

  const title = screen.getByRole('heading', {
    name: /Page requested not found/i,
    nivel: 2,
  });

  expect(title).toBeInTheDocument();
});

test('Mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');

  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const alt = 'Pikachu crying because the page requested was not found';
  const img = screen.getByAltText(alt);

  expect(img).toBeInTheDocument();
  expect(img.src).toBe(src);
  expect(img.alt).toBe(alt);
});
