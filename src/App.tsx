import { useState, useEffect } from 'react'

interface Follow {
  id: number
  username: string
  displayName: string
  avatar: string
  timestamp: string
  timeAgo: string
  followers: string
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  reason: string
  isVerified?: boolean
  mutualFollowers?: number
}

const mockFollows: Follow[] = [
  {
    id: 1,
    username: '@chadthunder99',
    displayName: 'Chad Thunder',
    avatar: '💪',
    timestamp: '2 mins ago',
    timeAgo: 'Just now',
    followers: '45.2K',
    threatLevel: 'critical',
    reason: 'Gym bro. Posts shirtless. 6\'4".',
    isVerified: false,
    mutualFollowers: 0
  },
  {
    id: 2,
    username: '@jake_adventures',
    displayName: 'Jake 🌍✈️',
    avatar: '🧳',
    timestamp: '15 mins ago',
    timeAgo: '15m',
    followers: '128K',
    threatLevel: 'high',
    reason: 'Travel influencer. Very aesthetic feed.',
    isVerified: true,
    mutualFollowers: 2
  },
  {
    id: 3,
    username: '@marcus.cooks',
    displayName: 'Chef Marcus',
    avatar: '👨‍🍳',
    timestamp: '1 hour ago',
    timeAgo: '1h',
    followers: '89K',
    threatLevel: 'medium',
    reason: 'He cooks. You order DoorDash.',
    isVerified: false,
    mutualFollowers: 5
  },
  {
    id: 4,
    username: '@daniel_music',
    displayName: 'Daniel 🎸',
    avatar: '🎵',
    timestamp: '2 hours ago',
    timeAgo: '2h',
    followers: '234K',
    threatLevel: 'critical',
    reason: 'Musician. Plays guitar. It\'s over.',
    isVerified: true,
    mutualFollowers: 1
  },
  {
    id: 5,
    username: '@rescue_pets_org',
    displayName: 'Rescue Pets 🐕',
    avatar: '🐶',
    timestamp: '3 hours ago',
    timeAgo: '3h',
    followers: '1.2M',
    threatLevel: 'low',
    reason: 'Just a wholesome pet account. You\'re safe.',
    isVerified: true,
    mutualFollowers: 12
  },
  {
    id: 6,
    username: '@fitness_tyler',
    displayName: 'Tyler Fitness',
    avatar: '🏋️',
    timestamp: '5 hours ago',
    timeAgo: '5h',
    followers: '67K',
    threatLevel: 'high',
    reason: 'Personal trainer. DMs "free session" to everyone.',
    isVerified: false,
    mutualFollowers: 0
  }
]

function IckFace({ threatLevel }: { threatLevel: number }) {
  const getExpression = () => {
    if (threatLevel < 25) return { leftEye: '•', rightEye: '•', mouth: '‿', eyebrowAngle: 0 }
    if (threatLevel < 50) return { leftEye: '•', rightEye: '◦', mouth: '—', eyebrowAngle: -5 }
    if (threatLevel < 75) return { leftEye: '◔', rightEye: '◔', mouth: '︵', eyebrowAngle: -15 }
    return { leftEye: '◉', rightEye: '◉', mouth: '╭╮', eyebrowAngle: -25 }
  }

  const expr = getExpression()
  const isShaking = threatLevel >= 75

  return (
    <div className={`ick-face w-20 h-20 rounded-3xl flex flex-col items-center justify-center shadow-xl ${isShaking ? 'animate-shake' : ''}`}>
      <div className="flex gap-4 mb-1">
        <div className="relative">
          <div 
            className="absolute -top-2 left-0 w-4 h-0.5 bg-pink-800/60 rounded-full"
            style={{ transform: `rotate(${expr.eyebrowAngle}deg)`, transformOrigin: 'right center' }}
          />
          <span className="text-pink-800 text-lg font-bold">{expr.leftEye}</span>
        </div>
        <div className="relative">
          <div 
            className="absolute -top-2 right-0 w-4 h-0.5 bg-pink-800/60 rounded-full"
            style={{ transform: `rotate(${-expr.eyebrowAngle}deg)`, transformOrigin: 'left center' }}
          />
          <span className="text-pink-800 text-lg font-bold">{expr.rightEye}</span>
        </div>
      </div>
      <span className="text-pink-800 text-sm mt-1">{expr.mouth}</span>
    </div>
  )
}

function ThreatBadge({ level }: { level: Follow['threatLevel'] }) {
  const config = {
    low: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Safe' },
    medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Hmm...' },
    high: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Suspicious' },
    critical: { bg: 'bg-red-500/20', text: 'text-red-400', label: '🚨 THREAT' }
  }

  const c = config[level]

  return (
    <span className={`${c.bg} ${c.text} px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide`}>
      {c.label}
    </span>
  )
}

function FollowCard({ follow, index }: { follow: Follow; index: number }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), index * 150)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div 
      className={`glass-card rounded-2xl p-4 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400/30 to-purple-500/30 flex items-center justify-center text-2xl">
          {follow.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white truncate">{follow.displayName}</span>
            {follow.isVerified && (
              <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-gray-500 text-sm truncate">{follow.username}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-600 text-xs">{follow.followers} followers</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-600 text-xs">{follow.timeAgo}</span>
          </div>
        </div>
        <ThreatBadge level={follow.threatLevel} />
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/5">
        <p className="text-gray-400 text-sm italic">"{follow.reason}"</p>
        {follow.mutualFollowers !== undefined && follow.mutualFollowers > 0 && (
          <p className="text-pink-400/60 text-xs mt-2">
            👀 {follow.mutualFollowers} mutual followers
          </p>
        )}
      </div>
    </div>
  )
}

function StatsCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="glass-card rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display font-bold text-xl text-white">{value}</div>
      <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [threatMeter, setThreatMeter] = useState(0)
  const [activeTab, setActiveTab] = useState<'recent' | 'flagged'>('recent')
  const [showModal, setShowModal] = useState(false)

  const calculateThreatLevel = () => {
    const weights = { low: 5, medium: 20, high: 35, critical: 50 }
    const total = mockFollows.reduce((acc, f) => acc + weights[f.threatLevel], 0)
    return Math.min(100, Math.round(total / mockFollows.length * 1.5))
  }

  useEffect(() => {
    setLoaded(true)
    const targetThreat = calculateThreatLevel()
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setThreatMeter(prev => {
          if (prev >= targetThreat) {
            clearInterval(interval)
            return targetThreat
          }
          return prev + 2
        })
      }, 30)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const flaggedFollows = mockFollows.filter(f => f.threatLevel === 'high' || f.threatLevel === 'critical')
  const displayFollows = activeTab === 'recent' ? mockFollows : flaggedFollows

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-950/20 via-black to-black pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 -left-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto px-4 pt-8">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            <span className="text-pink-300 text-sm font-medium">Live Tracking</span>
          </div>
          <h1 className="font-display font-black text-4xl tracking-tight mb-2">
            The Ick
          </h1>
          <p className="text-gray-400 text-lg">Boyfriend Edition™</p>
        </div>

        {/* App Store Card */}
        <div 
          className={`glass-card rounded-3xl p-5 mb-6 animate-glow transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          onClick={() => setShowModal(true)}
        >
          <div className="flex items-center gap-4">
            <div className="animate-float">
              <IckFace threatLevel={threatMeter} />
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-xl text-white">Who's She Following?</h2>
              <p className="text-pink-300/70 text-sm">See her recent follows & activity</p>
              <div className="flex items-center gap-2 mt-2">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-1.5 rounded-full text-sm transition-colors">
                  Check
                </button>
                <span className="text-gray-500 text-xs">In-App Paranoia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Meter */}
        <div className={`glass-card rounded-2xl p-5 mb-6 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">Overall Threat Level</span>
            <span className={`font-display font-bold text-2xl ${
              threatMeter < 25 ? 'text-emerald-400' :
              threatMeter < 50 ? 'text-yellow-400' :
              threatMeter < 75 ? 'text-orange-400' : 'text-red-400'
            }`}>
              {threatMeter}%
            </span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full threat-meter rounded-full transition-all duration-300 ease-out"
              style={{ width: `${threatMeter}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2 text-center">
            {threatMeter < 25 ? "Looking good, king 👑" :
             threatMeter < 50 ? "Keep an eye out... 👀" :
             threatMeter < 75 ? "Time to hit the gym 🏋️" :
             "It's joever 💀"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-3 gap-3 mb-6 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatsCard label="New Follows" value="6" icon="👤" />
          <StatsCard label="Flagged" value="4" icon="🚩" />
          <StatsCard label="This Week" value="23" icon="📊" />
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 mb-4 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'recent' 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Recent Follows
          </button>
          <button 
            onClick={() => setActiveTab('flagged')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'flagged' 
                ? 'bg-red-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Flagged
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === 'flagged' ? 'bg-white/20' : 'bg-red-500/30 text-red-400'
            }`}>
              {flaggedFollows.length}
            </span>
          </button>
        </div>

        {/* Follow List */}
        <div className="space-y-3">
          {displayFollows.map((follow, index) => (
            <FollowCard key={follow.id} follow={follow} index={index} />
          ))}
        </div>

        {/* Empty state for flagged */}
        {activeTab === 'flagged' && flaggedFollows.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-gray-400">No threats detected</p>
            <p className="text-gray-600 text-sm">You're safe... for now</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <p className="text-gray-600 text-xs">
            Requested by <a href="https://twitter.com/0xPaulius" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-400 transition-colors">@0xPaulius</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-400 transition-colors">@clonkbot</a>
          </p>
        </footer>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="glass-card rounded-3xl p-6 max-w-sm w-full animate-reveal"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-xl mb-2">App Stats</h3>
            <p className="text-gray-400 mb-6">200k downloads & $100k revenue last month</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-2xl transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}