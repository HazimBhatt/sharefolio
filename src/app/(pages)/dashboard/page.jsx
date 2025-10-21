'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Skeleton 
} from "@/components/ui/skeleton";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Plus,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  Crown,
  Zap,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [portfoliosLoading, setPortfoliosLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Fetch user's portfolios
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchPortfolios();
    }
  }, [isAuthenticated, user]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolios/dashboard', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data.portfolios || []);
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setPortfoliosLoading(false);
    }
  };

  const handleCreatePortfolio = () => {
    router.push('/portfolio/create');
  };

  const handleViewPortfolio = (subdomain) => {
    window.open(`/v1/${subdomain}`, '_blank');
  };

  const handleEditPortfolio = (portfolioId) => {
    router.push(`/portfolio/edit/${portfolioId}`);
  };

  const handleDeletePortfolio = async (portfolioId) => {
    if (!confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/portfolios/dashboard/${portfolioId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setPortfolios(prev => prev.filter(p => p._id !== portfolioId));
      } else {
        alert('Failed to delete portfolio');
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('Error deleting portfolio');
    }
  };

  if (loading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
// console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8  mt-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your portfolios, track your tokens, and grow your online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#7332a8]" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-[#7332a8]">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-[#7332a8] text-white font-semibold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-[#7332a8]">{user?.tokens || 0}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Available Tokens</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-[#7332a8]">{portfolios.length}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Portfolios</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token & Subscription Card */}
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#7332a8]" />
                  Token Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#7332a8] to-[#b266ff] rounded-lg text-white">
                  <div>
                    <div className="text-2xl font-bold">{user?.tokens || 0}</div>
                    <div className="text-sm opacity-90">Available Tokens</div>
                  </div>
                  <Sparkles className="h-8 w-8 opacity-80" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Plan</span>
                    <Badge variant={user?.subscription?.type === 'pro' ? 'default' : 'secondary'} 
                      className={user?.subscription?.type === 'pro' ? 'bg-[#7332a8]' : ''}>
                      {user?.subscription?.type?.toUpperCase() || 'FREE'}
                    </Badge>
                  </div>
                  
                  {user?.subscription?.expiresAt && (
                    <div className="flex justify-between items-center text-sm">
                      <span>Renews</span>
                      <span>{new Date(user.subscription.expiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full p-3" onClick={() => router.push('/pricing')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#7332a8]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleCreatePortfolio}
                  disabled={!user?.tokens || user.tokens < 1}
                >
                  <Plus className="h-4 w-4" />
                  Create New Portfolio
                </Button>
                <Button 
                  variant="primary" 
                  className="w-full justify-start gap-2 p-3"
                  onClick={() => router.push('/settings')}
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolios Section */}
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#7332a8]" />
                    Your Portfolios
                  </CardTitle>
                  <CardDescription>
                    Manage and view all your created portfolios
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleCreatePortfolio}
                  disabled={!user?.tokens || user.tokens < 1}
                  className="gap-2 p-3"
                >
                  <Plus className="h-4 w-4" />
                  Create New
                </Button>
              </CardHeader>
              <CardContent>
                {portfoliosLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : portfolios.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No portfolios yet
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-sm mx-auto">
                      Create your first portfolio to showcase your work and skills to the world.
                    </p>
                    <Button 
                      onClick={handleCreatePortfolio}
                      disabled={!user?.tokens || user.tokens < 1}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Portfolio
                    </Button>
                    
                    {(!user?.tokens || user.tokens < 1) && (
                      <p className="text-sm text-red-500 mt-3">
                        You need at least 1 token to create a portfolio. 
                        <Button variant="link" className="p-0 ml-1 h-auto" onClick={() => router.push('/pricing')}>
                          Get more tokens
                        </Button>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <PortfolioCard 
                        key={portfolio._id}
                        portfolio={portfolio}
                        onView={handleViewPortfolio}
                        onEdit={handleEditPortfolio}
                        onDelete={handleDeletePortfolio}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#7332a8]" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent portfolio views and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolios.slice(0, 3).map((portfolio) => (
                    <div key={portfolio._id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#7332a8] to-[#b266ff] rounded-lg flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{portfolio.personalInfo?.firstName}'s Portfolio</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {portfolio.views || 0} total views
                          </p>
                        </div>
                      </div>
                      <Badge variant={portfolio.isPublished ? 'default' : 'secondary'}>
                        {portfolio.isPublished ? 'Live' : 'Draft'}
                      </Badge>
                    </div>
                  ))}
                  
                  {portfolios.length === 0 && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      No activity yet. Create a portfolio to get started!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({ portfolio, onView, onEdit, onDelete }) {
  const fullName = `${portfolio.personalInfo?.firstName} ${portfolio.personalInfo?.lastName}`;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#7332a8] transition-colors group">
      <div className="flex items-start gap-4 flex-1">
        <Avatar className="h-12 w-12 border-2 border-[#7332a8]">
          <AvatarImage src={portfolio.personalInfo?.avatar} alt={fullName} />
          <AvatarFallback className="bg-[#7332a8] text-white font-semibold">
            {portfolio.personalInfo?.firstName?.[0]}{portfolio.personalInfo?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg truncate">{fullName}</h3>
            <Badge variant={portfolio.isPublished ? 'default' : 'secondary'} 
              className={portfolio.isPublished ? 'bg-green-500' : ''}>
              {portfolio.isPublished ? 'Live' : 'Draft'}
            </Badge>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
            {portfolio.personalInfo?.professionalTitle}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {portfolio.views || 0} views
            </span>
            <span>Template: {portfolio.template}</span>
            <span>Subdomain: {portfolio.subdomain}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onView(portfolio.subdomain)}
          className="gap-1"
        >
          <Eye className="h-3 w-3" />
          View
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(portfolio._id)}
          className="gap-1"
        >
          <Edit className="h-3 w-3" />
          Edit
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(portfolio._id)}
          className="gap-1 text-red-600 hover:text-red-700 hover:border-red-200"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

// Loading Component
function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#7332a8]/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#7332a8] border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}