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
    <AdminLayout activePage="support" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="flex h-[calc(100vh-6rem)] min-h-0 flex-col px-4 pb-4 pt-5 sm:px-8">
        <header className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-primary">Support Center</h1>
            <p className="text-xs text-text-secondary">Manage and resolve customer and driver support requests</p>
          </div>
        </header>

        <div className="flex flex-1 gap-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#1A1A1A] p-0 shadow-lg lg:flex-row flex-col">
          {/* Ticket List Panel */}
          <div className="flex w-full flex-col border-r border-white/[0.08] lg:w-[360px] shrink-0">
            <div className="p-4 border-b border-white/[0.08]">
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search tickets, names, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#242424] py-2 pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50"
                />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex gap-1.5 rounded-lg bg-[#242424] p-0.5">
                {['all', 'open', 'pending', 'resolved'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex-1 py-1 text-center text-xs font-semibold rounded-md transition-all capitalize border-none cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#F5C518] text-black'
                        : 'text-gray-400 hover:text-white bg-transparent'
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
                <div className="p-8 text-center text-gray-500">
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
                          ? 'bg-[#F5C518]/10 border-l-4 border-l-[#F5C518]' 
                          : 'hover:bg-white/[0.02] bg-transparent border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-xs text-gray-500">{t.id}</span>
                        <span className="text-[10px] text-gray-500">{t.date}</span>
                      </div>
                      
                      <div className="font-semibold text-sm text-white truncate">{t.subject}</div>

                      <div className="flex justify-between items-center w-full mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-[#F5C518]">
                            {t.user.avatar}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{t.user.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            t.status === 'open' 
                              ? 'bg-[#F44336]/20 text-[#F44336] border border-[#F44336]/30' 
                              : t.status === 'pending'
                              ? 'bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/30'
                              : 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30'
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
          <div className="flex flex-1 flex-col bg-[#1A1A1A] min-w-0">
            {selectedTicket ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#242424]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5C518]/20 flex items-center justify-center font-bold text-sm text-[#F5C518]">
                      {selectedTicket.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm text-white leading-none">{selectedTicket.user.name}</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 font-semibold text-gray-400">
                          {selectedTicket.user.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{selectedTicket.user.email} · {selectedTicket.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedTicket.status !== 'resolved' && (
                      <button
                        onClick={handleResolveTicket}
                        className="rounded-lg border border-[#4CAF50]/35 bg-transparent px-3.5 py-1.5 font-sans text-xs font-semibold text-[#4CAF50] hover:bg-[#4CAF50]/10 cursor-pointer"
                      >
                        ✓ Mark Resolved
                      </button>
                    )}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                      selectedTicket.priority === 'high' 
                        ? 'bg-[#F44336]/20 text-[#F44336]' 
                        : selectedTicket.priority === 'medium'
                        ? 'bg-[#FFB300]/20 text-[#FFB300]'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedTicket.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Ticket Details summary */}
                <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.04]">
                  <p className="text-xs text-gray-400"><span className="font-bold text-white">Topic:</span> {selectedTicket.category}</p>
                  <p className="text-xs text-gray-400 mt-1"><span className="font-bold text-white">Subject:</span> {selectedTicket.subject}</p>
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
                              ? 'bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/20 rounded-tr-none'
                              : 'bg-white/[0.06] text-white rounded-tl-none'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[9px] text-gray-500 mt-1 px-1">{m.timestamp}</span>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Reply Footer */}
                {selectedTicket.status === 'resolved' ? (
                  <div className="p-4 border-t border-white/[0.08] text-center text-xs text-gray-400 bg-white/[0.02]">
                    This ticket has been marked as resolved. Re-open it by typing a message.
                  </div>
                ) : null}

                <form onSubmit={handleSendReply} className="p-4 border-t border-white/[0.08] bg-[#242424] flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a reply to resolve user request..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#F5C518]/50"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#F5C518] px-5 py-2.5 font-bold text-black border-none transition-all hover:bg-[#D4A80E] cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-8 gap-6">
                <div>
                  <p className="text-4xl mb-4">💬</p>
                  <h3 className="font-bold text-white mb-1">No ticket selected</h3>
                  <p className="text-xs text-gray-500">Choose a ticket from the left panel to review message log.</p>
                </div>
                
                {/* HEAD's Direct Assistance Contacts */}
                <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg text-left">
                  <h2 className="mb-3 text-sm font-bold text-white">Direct Assistance</h2>
                  <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                    Need urgent supervisor support? Contact operational leads directly:
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                      <span className="font-semibold text-gray-300">Operations Phone</span>
                      <span className="font-bold text-white">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-300">Admin Support Email</span>
                      <span className="font-bold text-[#F5C518]">ops@nqtaxi.com</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
