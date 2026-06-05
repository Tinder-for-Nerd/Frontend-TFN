import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../store/bookingStore';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { Tabs } from '../components/ui/Tabs';
import { Star, Clock, DollarSign, Calendar, BookOpen } from 'lucide-react';
import { getSessionTypeLabel } from '../lib/utils';
import { toast } from 'sonner';
import type { SessionType, Mentor } from '../types';

const sessionTypeOptions = [
  { value: 'coffee_chat', label: 'Coffee Chat' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'resume_review', label: 'Resume Review' },
  { value: 'mock_interview', label: 'Mock Interview' },
  { value: 'webinar', label: 'Webinar' },
];

export default function SessionsPage() {
  const { mentors, bookings, createBooking } = useBookingStore();
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedType, setSelectedType] = useState<SessionType>('coffee_chat');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);

  const tabs = [
    { id: 'browse', label: 'Browse Mentors' },
    { id: 'bookings', label: 'My Bookings', count: bookings.length },
  ];

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setSelectedType('coffee_chat');
    setSelectedDate('');
    setSelectedTime('');
    setStep(1);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedMentor) return;
    const booking = bookings.find(
      (b) =>
        b.mentorId === selectedMentor.id &&
        b.date === selectedDate &&
        b.time === selectedTime
    );
    if (booking) {
      toast.error('This time slot is already booked');
      return;
    }
    createBooking(
      selectedMentor.id,
      selectedType,
      selectedDate,
      selectedTime,
      60,
      selectedType === 'coffee_chat' ? 0 : selectedMentor.price
    );
    toast.success('Session booked successfully!');
    setShowBookingModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Sessions</h1>
        <p className="text-sm text-[#64748B]">Book mentorship and coaching sessions</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'browse' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar name={mentor.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0F172A]">{mentor.name}</h3>
                    <p className="text-xs text-[#64748B]">{mentor.title} at {mentor.company}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        {mentor.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {mentor.experience} yrs
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} />
                        {mentor.price === 0 ? 'Free' : `$${mentor.price}`}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-[#64748B] line-clamp-2">{mentor.bio}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {mentor.sessionTypes.map((st) => (
                    <Badge key={st} variant="info">{getSessionTypeLabel(st)}</Badge>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleBookSession(mentor)}>
                    <BookOpen size={14} />
                    Book Session
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => toast.info(`Viewing ${mentor.name}'s profile`)}>
                    View Profile
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-[#CBD5E1]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">No bookings yet</h3>
              <p className="mt-1 text-sm text-[#64748B]">Book your first mentorship session</p>
            </Card>
          ) : (
            bookings.map((booking) => {
              const mentor = mentors.find((m) => m.id === booking.mentorId);
              return (
                <Card key={booking.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar name={mentor?.name || 'Mentor'} size="md" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#0F172A]">{mentor?.name}</h4>
                      <p className="text-xs text-[#64748B]">{getSessionTypeLabel(booking.sessionType)}</p>
                    </div>
                    <div className="text-right text-xs text-[#64748B]">
                      <p>{booking.date}</p>
                      <p>{booking.time}</p>
                    </div>
                    <Badge
                      variant={
                        booking.status === 'confirmed' ? 'success' :
                        booking.status === 'pending' ? 'warning' :
                        booking.status === 'completed' ? 'info' : 'danger'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={step === 1 ? 'Book a Session' : 'Confirm Booking'}
      >
        {selectedMentor && (
          <div className="space-y-4">
            {step === 1 ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3">
                  <Avatar name={selectedMentor.name} size="md" />
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{selectedMentor.name}</p>
                    <p className="text-xs text-[#64748B]">${selectedMentor.price}/session</p>
                  </div>
                </div>

                <Select
                  label="Session Type"
                  options={sessionTypeOptions}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as SessionType)}
                />

                <Input
                  label="Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />

                <Input
                  label="Time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />

                <Button
                  className="w-full"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="rounded-xl bg-[#F8FAFC] p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Mentor</span>
                    <span className="font-medium text-[#0F172A]">{selectedMentor.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Session</span>
                    <span className="font-medium text-[#0F172A]">{getSessionTypeLabel(selectedType)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Date</span>
                    <span className="font-medium text-[#0F172A]">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Time</span>
                    <span className="font-medium text-[#0F172A]">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Duration</span>
                    <span className="font-medium text-[#0F172A]">60 min</span>
                  </div>
                  <div className="border-t border-[#E2E8F0] pt-2 flex justify-between text-sm">
                    <span className="font-medium text-[#0F172A]">Total</span>
                    <span className="font-bold text-[#2563EB]">
                      {selectedType === 'coffee_chat' ? 'Free' : `$${selectedMentor.price}`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleConfirmBooking}>
                    Confirm Booking
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
