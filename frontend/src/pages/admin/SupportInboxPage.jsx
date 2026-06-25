import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const INITIAL_TICKETS = [
  {
    id: 'TKT-4921',
    user: { name: 'Rohan Sen', type: 'Rider', avatar: 'RS', email: 'rohan.sen@gmail.com' },
    subject: 'Double charge on trip #NQ123456',
    category: 'Billing',
    status: 'open',
    priority: 'high',
    date: 'Today, 10:14 AM',
    messages: [
      { sender: 'user', text: 'Hi support, my credit card was charged twice for my trip today. The receipt says ₹520 but my bank statement shows two debits of ₹520.', timestamp: '10:14 AM' },
    ],
  },
  {
    id: 'TKT-3829',
    user: { name: 'Manoj Kumar', type: 'Driver', avatar: 'MK', email: 'manoj.k@nqtaxi.com' },
    subject: 'App crash during navigation near airport',
    category: 'Technical',
    status: 'open',
    priority: 'medium',
    date: 'Today, 8:45 AM',
    messages: [
      { sender: 'user', text: 'The driver app completely crashed when I approached the airport toll plaza. I had to restart my phone, and the trip fare was incorrectly calculated.', timestamp: '8:45 AM' },
    ],
  },
  {
    id: 'TKT-1082',
    user: { name: 'Neha Kapoor', type: 'Rider', avatar: 'NK', email: 'neha.k@yahoo.com' },
    subject: 'Driver refused to switch on AC',
    category: 'Service Quality',
    status: 'pending',
    priority: 'low',
    date: 'Yesterday, 6:30 PM',
    messages: [
      { sender: 'user', text: 'I booked a Prime Sedan specifically for a comfortable ride, but the driver refused to turn on the AC saying gas prices are too high. Please refund the premium price difference.', timestamp: 'Yesterday, 6:30 PM' },
      { sender: 'admin', text: 'Hello Neha, we are extremely sorry for the inconvenience. Let us look into this trip right away.', timestamp: 'Yesterday, 7:15 PM' },
      { sender: 'user', text: 'Yes, please do. He was quite rude about it.', timestamp: 'Yesterday, 7:22 PM' },
    ],
  },
  {
    id: 'TKT-0951',
    user: { name: 'Amit Verma', type: 'Driver', avatar: 'AV', email: 'amit.verma90@gmail.com' },
    subject: 'Payout not credited to bank account',
    category: 'Payouts',
    status: 'resolved',
    priority: 'high',
    date: 'Yesterday, 11:20 AM',
    messages: [
      { sender: 'user', text: 'My weekly payout for the week ending June 22 says Transferred on the app, but my HDFC bank account has not received it.', timestamp: 'Yesterday, 11:20 AM' },
      { sender: 'admin', text: 'Hi Amit, HDFC bank servers were undergoing maintenance yesterday. The transaction has cleared on our side and should reflect in your bank account within 2-4 business hours.', timestamp: 'Yesterday, 11:55 AM' },
      { sender: 'user', text: 'Thanks, I just received the bank credit notification. Marking this resolved.', timestamp: 'Yesterday, 2:10 PM' },
    ],
  },
];

const AUTO_REPLIES = [
  "Thank you for looking into this so quickly! I appreciate your support.",
  "Got it, that makes sense. Let me try that and I will let you know.",
  "Okay, thank you. How long does it usually take to process this refund?",
  "Perfect! The NQTaxi support team is always extremely helpful. Thanks!",
  "Great. I will wait for your updates."
];

export default function SupportInboxPage({ email = 'admin@example.com', onLogout, onNavigate }) {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('nqTaxiSupportTickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });
  const [selectedTicketId, setSelectedTicketId] = useState('TKT-4921');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [replyText, setReplyText] = useState('');
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nqTaxiSupportTickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    // Scroll to bottom of chat when selecting ticket or ticket messages update
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicketId, tickets]);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;

    const newMessage = {
      sender: 'admin',
      text: replyText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          status: 'pending',
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    setReplyText('');

    // Trigger simulated user reply
    setTimeout(() => {
      const randomReply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const userReply = {
        sender: 'user',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setTickets(prev => prev.map(t => {
        if (t.id === selectedTicketId) {
          return {
            ...t,
            messages: [...t.messages, userReply]
          };
        }
        return t;
      }));
    }, 1500);
  };

  const handleResolveTicket = () => {
    if (!selectedTicketId) return;
    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          status: 'resolved'
        };
      }
      return t;
    }));
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout activePage="mail" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="flex h-[calc(100vh-6rem)] min-h-0 flex-col px-4 pb-4 pt-5 sm:px-8">
        <header className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-primary">Support Center</h1>
            <p className="text-xs text-text-secondary">Manage and resolve customer and driver support requests</p>
          </div>
        </header>

        <div className="flex flex-1 gap-5 overflow-hidden rounded-xl border border-white/[0.08] bg-bg-secondary p-0 shadow-panel lg:flex-row flex-col">
          {/* Ticket List Panel */}
          <div className="flex w-full flex-col border-r border-white/[0.08] lg:w-[360px] shrink-0">
            {/* Search and filter controls */}
            <div className="p-4 border-b border-white/[0.08]">
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search tickets, names, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-bg-primary py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary/50"
                />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1.5 rounded-lg bg-bg-primary p-0.5">
                {['all', 'open', 'pending', 'resolved'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex-1 py-1 text-center text-xs font-semibold rounded-md transition-all capitalize border-none cursor-pointer ${
                      statusFilter === status
                        ? 'bg-primary text-black'
                        : 'text-text-secondary hover:text-text-primary bg-transparent'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <div className="p-8 text-center text-text-secondary">
                  <p className="text-3xl mb-2">📬</p>
                  <p className="text-xs">No tickets match your filters.</p>
                </div>
              ) : (
                filteredTickets.map(t => {
                  const isActive = t.id === selectedTicketId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTicketId(t.id)}
                      className={`w-full text-left p-4 border-b border-white/[0.04] transition-all flex flex-col gap-2 border-none cursor-pointer ${
                        isActive 
                          ? 'bg-primary/10 border-l-4 border-l-primary' 
                          : 'hover:bg-white/[0.02] bg-transparent border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-xs text-text-secondary">{t.id}</span>
                        <span className="text-[10px] text-text-secondary">{t.date}</span>
                      </div>
                      
                      <div className="font-semibold text-sm text-text-primary truncate">{t.subject}</div>

                      <div className="flex justify-between items-center w-full mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-primary">
                            {t.user.avatar}
                          </div>
                          <span className="text-xs text-text-secondary font-medium">{t.user.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            t.status === 'open' 
                              ? 'bg-danger/20 text-danger border border-danger/30' 
                              : t.status === 'pending'
                              ? 'bg-warning/20 text-warning border border-warning/30'
                              : 'bg-success/20 text-success border border-success/30'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="flex flex-1 flex-col bg-bg-primary/30 min-w-0">
            {selectedTicket ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-bg-secondary/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm text-primary">
                      {selectedTicket.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm text-text-primary leading-none">{selectedTicket.user.name}</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 font-semibold text-text-secondary">
                          {selectedTicket.user.type}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{selectedTicket.user.email} · {selectedTicket.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedTicket.status !== 'resolved' && (
                      <button
                        onClick={handleResolveTicket}
                        className="rounded-lg border border-success/35 bg-transparent px-3.5 py-1.5 font-sans text-xs font-semibold text-success hover:bg-success/10 cursor-pointer"
                      >
                        ✓ Mark Resolved
                      </button>
                    )}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                      selectedTicket.priority === 'high' 
                        ? 'bg-danger/20 text-danger' 
                        : selectedTicket.priority === 'medium'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-info/20 text-info'
                    }`}>
                      {selectedTicket.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Ticket Details summary */}
                <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.04]">
                  <p className="text-xs text-text-secondary"><span className="font-bold text-text-primary">Topic:</span> {selectedTicket.category}</p>
                  <p className="text-xs text-text-secondary mt-1"><span className="font-bold text-text-primary">Subject:</span> {selectedTicket.subject}</p>
                </div>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedTicket.messages.map((m, idx) => {
                    const isAdmin = m.sender === 'admin';
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[70%] ${
                          isAdmin ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                      >
                        <div
                          className={`p-3 rounded-2xl text-sm ${
                            isAdmin
                              ? 'bg-primary/10 text-primary border border-primary/20 rounded-tr-none'
                              : 'bg-white/[0.06] text-text-primary rounded-tl-none'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[9px] text-text-secondary mt-1 px-1">{m.timestamp}</span>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Reply Footer */}
                {selectedTicket.status === 'resolved' ? (
                  <div className="p-4 border-t border-white/[0.08] text-center text-xs text-text-secondary bg-bg-secondary/20">
                    This ticket has been marked as resolved. Re-open it by typing a message.
                  </div>
                ) : null}

                <form onSubmit={handleSendReply} className="p-4 border-t border-white/[0.08] bg-bg-secondary/40 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a reply to resolve user request..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-5 py-2.5 font-bold text-black border-none transition-all hover:bg-primary-dark cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
                <p className="text-4xl mb-4">💬</p>
                <h3 className="font-bold text-text-primary mb-1">No ticket selected</h3>
                <p className="text-xs text-text-secondary">Choose a ticket from the left panel to review message log.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
