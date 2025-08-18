import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddActivity from '../components/AddActivity/AddActivity';

describe('AddActivity', () => {
  it('validates required fields and calls onAdd', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddActivity onAdd={onAdd} />);

    // Try submit empty
    await user.click(screen.getByRole('button', { name: /log activity/i }));
    expect(onAdd).not.toHaveBeenCalled();

    // Fill fields
    await user.type(screen.getByPlaceholderText(/activity type/i), 'Running');
    await user.type(screen.getByPlaceholderText(/duration/i), '30');
    // Textarea has placeholder text, use that
    await user.type(screen.getByPlaceholderText(/notes/i), 'Morning run');

    await user.click(screen.getByRole('button', { name: /log activity/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd.mock.calls[0][0]).toMatchObject({ type: 'Running', duration: 30 });
  });
});
