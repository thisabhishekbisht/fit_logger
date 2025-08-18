import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Home page', () => {
  it('renders the welcome heading', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('heading', { name: /welcome to fittrack/i })).toBeInTheDocument();
  });

  it('has an Add Activity button that navigates', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('button', { name: /add activity/i })).toBeInTheDocument();
  });
});
