import { create } from 'zustand';
import type { Booking, SessionType, Mentor } from '../types';
import { mockBookings, mockMentors } from '../data/mockData';
import { generateId } from '../lib/utils';

interface BookingState {
  mentors: Mentor[];
  bookings: Booking[];
  createBooking: (mentorId: string, sessionType: SessionType, date: string, time: string, duration: number, price: number) => void;
  cancelBooking: (bookingId: string) => void;
  getMentorById: (id: string) => Mentor | undefined;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  mentors: mockMentors,
  bookings: mockBookings,

  createBooking: (mentorId, sessionType, date, time, duration, price) => {
    const newBooking: Booking = {
      id: generateId(),
      mentorId,
      userId: 'u1',
      sessionType,
      date,
      time,
      duration,
      price,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
  },

  cancelBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      ),
    }));
  },

  getMentorById: (id) => {
    return get().mentors.find((m) => m.id === id);
  },
}));
