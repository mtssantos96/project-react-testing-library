import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  const favoriteLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('Aplicação é redirecionada para Home ao clicar no link Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Aplicação é redirecionada para About ao clicar no link About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Aplicação é redirecionada para Favoritos ao clicar no link Favoritos', () => {
  const { history } = renderWithRouter(<App />);
  const favoritesLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(favoritesLink).toBeInTheDocument();
  userEvent.click(favoritesLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Deve testar um caminho não existente e a renderização do Not Found', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/xablau');

  const notFoundTitle = screen.getByRole('heading',
    { name: /Page requested not found/i });
  expect(notFoundTitle).toBeInTheDocument();
});
