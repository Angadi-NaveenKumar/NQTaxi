import { Card, Button } from '../../components/ui';
import { useAppStore } from '../../store/useAppStore';
import { Plus, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';

const transactions = [
  { id: 1, type: 'spent', title: 'Ride Payment', amount: '-₹240', date: 'Today, 2:45 PM' },
  { id: 2, type: 'added', title: 'Top up', amount: '+₹1,000', date: 'Yesterday, 6:00 PM' },
  { id: 3, type: 'spent', title: 'Ride Payment', amount: '-₹450', date: '1 Jun, 10:30 AM' },
];

export default function Wallet() {
  const { walletBalance } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold">Smart Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 flex flex-col justify-between min-h-[200px]">
          <div>
            <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Available Balance</p>
            <h2 className="text-5xl font-extrabold mt-2">₹{walletBalance.toLocaleString()}</h2>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-none py-2 px-4 text-sm">
              <Plus size={16} />
              Add Money
            </Button>
          </div>
        </Card>

        {/* Saved Cards */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Saved Cards</h3>
            <button className="text-primary text-sm font-bold">Manage</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-surface-elevated rounded-xl border border-white/5">
              <div className="p-2 bg-info/10 text-info rounded-lg"><CreditCard size={20} /></div>
              <div>
                <p className="font-bold text-sm">•••• 4242</p>
                <p className="text-xs text-text-secondary">Expires 12/26</p>
              </div>
              <span className="ml-auto text-[10px] font-bold bg-white/5 px-2 py-1 rounded uppercase">Default</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full py-2.5 text-sm border border-dashed border-white/10 bg-transparent hover:bg-white/5">
            Add New Card
          </Button>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((t) => (
            <Card key={t.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${t.type === 'spent' ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                  {t.type === 'spent' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <p className="font-bold">{t.title}</p>
                  <p className="text-xs text-text-secondary">{t.date}</p>
                </div>
              </div>
              <p className={`font-bold text-lg ${t.type === 'spent' ? 'text-text-primary' : 'text-success'}`}>
                {t.amount}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
