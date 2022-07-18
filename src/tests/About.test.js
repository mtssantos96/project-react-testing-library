import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

test('A página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);

  const title = screen.getByRole('heading', {
    name: /About Pokédex/i,
    nivel: 2,
  });

  expect(title).toBeInTheDocument();
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const paragraph01 = screen.getByText(/This application/i);
  const paragraph02 = screen.getByText(/One can/i);

  expect(paragraph01).toBeInTheDocument();
  expect(paragraph02).toBeInTheDocument();
});

test('A página contém uma imagen de uma Pokédex', () => {
  renderWithRouter(<About />);

  const image = screen.getByRole('img', {
    alt: /Pokédex/i,
  });
  const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(image).toBeInTheDocument();
  expect(image.src).toBe(src);
});
