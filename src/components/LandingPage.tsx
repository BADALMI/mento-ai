import * as React from 'react';
import { Brain, Users, Zap, Heart, ArrowRight, Shield, Clock, Target } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTeams } from '../hooks/useTeams';
import FloatingBlobs from './FloatingBlobs';

interface LandingPageProps {
  onNavigate: (view: 'dashboard' | 'team') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { user: authUser } = useAuth();
  const { createTeam, joinTeam } = useTeams(authUser);
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [roomCodeInput, setRoomCodeInput] = React.useState('');
  const [teamNameInput, setTeamNameInput] = React.useState('');
  const [joinError, setJoinError] = React.useState('');
  const [createError, setCreateError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleJoinTeam = async () => {
    if (!roomCodeInput.trim()) {
      setJoinError('Please enter a room code');
      return;
    }

    setIsLoading(true);
    setJoinError('');

    try {
      await joinTeam(roomCodeInput.trim());
      setShowJoinModal(false);
      setRoomCodeInput('');
      onNavigate('team');
    } catch (error: any) {
      setJoinError(error.message || 'Failed to join team');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamNameInput.trim()) {
      setCreateError('Please enter a team name');
      return;
    }

    setIsLoading(true);
    setCreateError('');

    try {
      await createTeam(teamNameInput.trim());
      setShowCreateModal(false);
      setTeamNameInput('');
      onNavigate('team');
    } catch (error: any) {
      setCreateError(error.message || 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <FloatingBlobs />
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Brain className="w-12 h-12 text-[#A5E3D8]" />
            </div>
          </div>
          
          <h1 className="font-sora font-semibold text-4xl sm:text-5xl lg:text-6xl text-[#334155] mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            🧠 Feel something, but can't explain it?<br />
            <span className="text-[#A5E3D8]">Meet MENTO</span> — your AI therapist companion.
          </h1>
          
          <p className="font-inter text-xl sm:text-2xl text-[#334155]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            It reads between your thoughts, tracks your emotional patterns, and helps you heal.
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/30 shadow-lg max-w-2xl mx-auto mb-12">
            <h2 className="font-sora font-semibold text-2xl text-[#334155] mb-4">
              Don't wait till burnout.
            </h2>
            <p className="font-inter text-lg text-[#334155]/80 mb-6 leading-relaxed">
              Most people ignore their mental health until it screams.<br />
              You don't have to.
            </p>
            <p className="font-inter text-lg text-[#334155]/80 mb-8">
              Start journaling today — and finally see what's going on inside you.
            </p>
            
            <button 
              onClick={() => onNavigate('dashboard')}
              className="group bg-[#A5E3D8] text-[#334155] px-10 py-4 rounded-2xl font-inter font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#8DD3C7] hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Emotional Pain Point Section */}
        <div className="bg-[#FFDBD3]/20 backdrop-blur-sm p-12 rounded-3xl border border-[#FFDBD3]/30 shadow-lg mb-20">
          <h2 className="font-sora font-semibold text-3xl sm:text-4xl text-[#334155] mb-8 text-center">
            Why do you feel what you feel?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="font-inter text-xl text-[#334155] mb-6 leading-relaxed text-center">
              You feel left out. Anxious. Maybe angry or just numb.<br />
              But you don't know why.
            </p>
            <p className="font-inter text-xl text-[#334155] leading-relaxed text-center">
              MENTO helps you decode your emotions by analyzing your real, everyday moments — not a one-time test or generic advice.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="font-sora font-semibold text-3xl sm:text-4xl text-[#334155] mb-16 text-center">
            How MENTO works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/30 shadow-lg text-center">
              <div className="w-full h-48 bg-gradient-to-br from-[#A5E3D8]/20 to-[#C2E7FF]/20 rounded-2xl mb-6 flex items-center justify-center border border-white/20">
                <span className="font-sora font-bold text-2xl text-[#334155]/50">STEP1</span>
              </div>
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-sora font-semibold text-xl text-[#334155] mb-4">
                You Journal Anything
              </h3>
              <p className="font-inter text-[#334155]/80 leading-relaxed">
                Write whatever you feel — even one line a day.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/30 shadow-lg text-center">
              <div className="w-full h-48 bg-gradient-to-br from-[#FFF6B3]/20 to-[#D2F8D2]/20 rounded-2xl mb-6 flex items-center justify-center border border-white/20">
                <span className="font-sora font-bold text-2xl text-[#334155]/50">STEP2</span>
              </div>
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-sora font-semibold text-xl text-[#334155] mb-4">
                MENTO Analyzes Your Emotional Patterns
              </h3>
              <p className="font-inter text-[#334155]/80 leading-relaxed">
                It tracks repeated emotional triggers, stress sources, and hidden issues.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/30 shadow-lg text-center">
              <div className="w-full h-48 bg-gradient-to-br from-[#FFDBD3]/20 to-[#A5E3D8]/20 rounded-2xl mb-6 flex items-center justify-center border border-white/20">
                <span className="font-sora font-bold text-2xl text-[#334155]/50">STEP3</span>
              </div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-sora font-semibold text-xl text-[#334155] mb-4">
                Your Personal AI Therapist Chats With You
              </h3>
              <p className="font-inter text-[#334155]/80 leading-relaxed">
                Based on your patterns, MENTO talks to you like a real companion, offering coping strategies, clarity, and calm.
              </p>
            </div>
          </div>
        </div>

        {/* Trust + Why AI Section */}
        <div className="bg-[#C2E7FF]/20 backdrop-blur-sm p-12 rounded-3xl border border-[#C2E7FF]/30 shadow-lg mb-20">
          <h2 className="font-sora font-semibold text-3xl sm:text-4xl text-[#334155] mb-8 text-center">
            Why an AI therapist?
          </h2>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="font-inter text-xl text-[#334155] mb-6 leading-relaxed">
              Because no one knows your story like you do.
            </p>
            <p className="font-inter text-xl text-[#334155] leading-relaxed">
              MENTO listens without judgment, tracks your mental health like a pro, and gives you 24/7 support — powered by psychology, not guesswork.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center">
              <Shield className="w-8 h-8 text-[#22C55E] mx-auto mb-4" />
              <h3 className="font-sora font-semibold text-lg text-[#334155] mb-2">
                ✅ Private & Secure
              </h3>
              <p className="font-inter text-[#334155]/70">
                Your thoughts stay yours
              </p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center">
              <Brain className="w-8 h-8 text-[#A5E3D8] mx-auto mb-4" />
              <h3 className="font-sora font-semibold text-lg text-[#334155] mb-2">
                ✅ Based on Journaling Psychology
              </h3>
              <p className="font-inter text-[#334155]/70">
                Science-backed approach
              </p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/30 text-center">
              <Target className="w-8 h-8 text-[#F59E0B] mx-auto mb-4" />
              <h3 className="font-sora font-semibold text-lg text-[#334155] mb-2">
                ✅ Trained to Recognize Emotional Patterns
              </h3>
              <p className="font-inter text-[#334155]/70">
                Personalized insights
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm p-12 rounded-3xl border border-white/30 shadow-lg max-w-3xl mx-auto">
            <h2 className="font-sora font-semibold text-3xl text-[#334155] mb-6">
              Ready to understand yourself better?
            </h2>
            <p className="font-inter text-xl text-[#334155]/80 mb-8 leading-relaxed">
              Join thousands who've found clarity through MENTO's AI-powered emotional intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="group bg-[#A5E3D8] text-[#334155] px-10 py-4 rounded-2xl font-inter font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#8DD3C7] hover:scale-105 flex items-center gap-3"
              >
                🧘 Start Solo Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="group bg-white/30 backdrop-blur-sm text-[#334155] px-10 py-4 rounded-2xl font-inter font-semibold text-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                🤝 Create Team Space
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setShowJoinModal(true)}
                className="group text-[#334155]/70 hover:text-[#334155] font-inter font-medium text-lg transition-colors underline decoration-dotted underline-offset-4"
              >
                Or join an existing team space
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Join Team Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
            <h4 className="font-sora font-semibold text-lg text-[#334155]">Join a Team</h4>
            <p className="text-sm text-[#334155]/70">Enter the room code shared by your team</p>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A5E3D8] font-mono tracking-widest uppercase"
              placeholder="Enter room code"
              value={roomCodeInput}
              onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
              disabled={isLoading}
              maxLength={6}
            />
            {joinError && <div className="text-red-500 text-sm">{joinError}</div>}
            <div className="flex gap-2">
              <button
                className="bg-[#A5E3D8] text-[#334155] px-4 py-2 rounded-lg font-inter font-medium flex-1 hover:bg-[#8DD3C7] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleJoinTeam}
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : 'Join'}
              </button>
              <button
                className="bg-gray-200 text-[#334155] px-4 py-2 rounded-lg font-inter font-medium flex-1 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => {
                  setShowJoinModal(false);
                  setRoomCodeInput('');
                  setJoinError('');
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
            <h4 className="font-sora font-semibold text-lg text-[#334155]">Create a Team</h4>
            <p className="text-sm text-[#334155]/70">Give your team a name to get started</p>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A5E3D8]"
              placeholder="Enter team name"
              value={teamNameInput}
              onChange={e => setTeamNameInput(e.target.value)}
              disabled={isLoading}
            />
            {createError && <div className="text-red-500 text-sm">{createError}</div>}
            <div className="flex gap-2">
              <button
                className="bg-[#A5E3D8] text-[#334155] px-4 py-2 rounded-lg font-inter font-medium flex-1 hover:bg-[#8DD3C7] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCreateTeam}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Team'}
              </button>
              <button
                className="bg-gray-200 text-[#334155] px-4 py-2 rounded-lg font-inter font-medium flex-1 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => {
                  setShowCreateModal(false);
                  setTeamNameInput('');
                  setCreateError('');
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;