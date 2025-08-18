import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ActivityLogger from '../pages/Logger/ActivityLogger';

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('ActivityLogger', () => {
  it('renders form and empty state', () => {
    renderWithRouter(<ActivityLogger />);
    expect(screen.getByText(/add activity/i)).toBeInTheDocument();
    expect(screen.getByText(/no activities logged yet/i)).toBeInTheDocument();
  });

  it('can add and delete an activity', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ActivityLogger />);

    await user.type(screen.getByPlaceholderText(/activity type/i), 'Cycling');
    await user.type(screen.getByPlaceholderText(/duration/i), '45');
    await user.click(screen.getByRole('button', { name: /log activity/i }));

    expect(screen.getByText(/cycling/i)).toBeInTheDocument();
    expect(screen.getByText(/45 mins/i)).toBeInTheDocument();

    // delete (use title attribute as accessible text is emoji)
    const deleteBtn = screen.getByTitle(/delete activity/i);
    await user.click(deleteBtn);

    expect(screen.queryByText(/cycling/i)).not.toBeInTheDocument();
  });
});
