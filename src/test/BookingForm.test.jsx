import { render, screen } from "@testing-library/react";
import BookingForm from '../components/BookingPage/BookingForm'; // Percorso corretto al componente

test('Renders the BookingForm heading', () => {
    render(<BookingForm availableTimes={[]} />); // Passa un array vuoto per evitare errori

    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
});