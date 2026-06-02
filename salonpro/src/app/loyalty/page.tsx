import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Gift, Star, Trophy, Crown } from "@phosphor-icons/react/dist/ssr";

export default function LoyaltyPage() {
  const points = 450;
  const history = [
    { id: 1, date: "2026-05-01", desc: "Classic Haircut Booking", points: "+50" },
    { id: 2, date: "2026-04-15", desc: "Premium Spa Booking", points: "+100" },
    { id: 3, date: "2026-03-28", desc: "Beard Trim Booking", points: "+30" },
    { id: 4, date: "2026-03-10", desc: "Reward Redemption", points: "-200", isRedemption: true },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative text-center mb-10">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Exclusive Benefits</p>
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">Loyalty Rewards</h1>
          <p className="text-textSecondary">Earn gold points on every visit. Unlock premium experiences.</p>
          <div className="gold-divider w-20 mx-auto mt-6 opacity-50" />
        </div>
      </div>

      {/* Points Card */}
      <Card className="p-8 md:p-10 text-center bg-gradient-to-b from-surface to-accent/5 border-accent/20 relative overflow-hidden mb-10 animate-fadeInUp shadow-gold-lg">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Gift size={160} weight="fill" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-5">
            <Crown size={14} weight="fill" className="text-accent" />
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">Gold Member</span>
          </div>
          <p className="text-xs text-textSecondary mb-3 uppercase tracking-widest font-bold">Your Balance</p>
          <div className="text-7xl font-serif gold-text mb-5 flex items-center justify-center gap-3">
            {points} <span className="text-xl text-textSecondary font-sans">pts</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2.5 mb-3 max-w-sm mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-accent-dark via-accent to-accent-light h-2.5 rounded-full shadow-gold transition-all duration-1000" style={{ width: '45%' }} />
          </div>
          <p className="text-xs text-textSecondary">50 points away from next reward</p>
        </div>
      </Card>

      {/* Available Rewards */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <Trophy size={20} className="text-accent" weight="duotone" /> Available Rewards
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 stagger-children">
          <Card className="p-5 flex justify-between items-center opacity-50 grayscale cursor-not-allowed animate-fadeInUp opacity-0">
            <div>
              <h3 className="font-semibold">Free Beard Trim</h3>
              <p className="text-xs text-textSecondary mt-1">Requires 500 pts</p>
            </div>
            <Button size="sm" variant="outline" disabled>Locked</Button>
          </Card>
          <Card className="p-5 flex justify-between items-center border-accent/20 bg-accent/5 hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
            <div>
              <h3 className="font-semibold text-accent">10% Off Next Visit</h3>
              <p className="text-xs text-textSecondary mt-1">Requires 300 pts ✓</p>
            </div>
            <Button size="sm" className="shadow-gold">Redeem</Button>
          </Card>
          <Card className="p-5 flex justify-between items-center opacity-50 grayscale cursor-not-allowed animate-fadeInUp opacity-0">
            <div>
              <h3 className="font-semibold">Free Premium Spa</h3>
              <p className="text-xs text-textSecondary mt-1">Requires 1000 pts</p>
            </div>
            <Button size="sm" variant="outline" disabled>Locked</Button>
          </Card>
          <Card className="p-5 flex justify-between items-center opacity-50 grayscale cursor-not-allowed animate-fadeInUp opacity-0">
            <div>
              <h3 className="font-semibold">VIP Membership</h3>
              <p className="text-xs text-textSecondary mt-1">Requires 2000 pts</p>
            </div>
            <Button size="sm" variant="outline" disabled>Locked</Button>
          </Card>
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <Star size={20} className="text-accent" weight="duotone" /> Points History
        </h2>
        <div className="space-y-1 stagger-children">
          {history.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b border-surface/30 hover:bg-surface/30 transition-colors rounded-lg animate-fadeInUp opacity-0">
              <div>
                <p className="font-medium text-sm">{item.desc}</p>
                <p className="text-[11px] text-textSecondary mt-0.5">{item.date}</p>
              </div>
              <div className={`font-bold text-lg ${item.isRedemption ? 'text-error' : 'text-success'}`}>
                {item.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
