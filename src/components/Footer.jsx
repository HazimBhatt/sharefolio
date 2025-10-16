'use client';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  MessageSquare,
  HelpCircle,
  FileText,
  Shield,
  CreditCard,
  Sparkles,
  Zap,
  Users,
  Info,
  Handshake,
  Cookie,
  Check,
  X,
  RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Generate", href: "/generate", icon: <Sparkles color={"white"} size={16} /> },
        { name: "Pricing", href: "/pricing", icon: <CreditCard color={"white"} size={16} /> },
        { name: "Login", href: "/auth", icon: <Zap color={"white"} size={16} /> },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog", icon: <FileText color={"white"} size={16} /> },
        { name: "Help Center", href: "/help", icon: <HelpCircle color={"white"} size={16} /> },
        { name: "Community", href: "/community", icon: <Users color={"white"} size={16} /> },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: <Info color={"white"} size={16} /> },
        { name: "Contact", href: "/contact", icon: <Mail  color={"white"} size={16} /> },
        { name: "Reviews", href: "/reviews", icon: <Handshake color={"white"} size={16} /> }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy", icon: <Shield color={"white"} size={16} /> },
        { name: "Terms of Service", href: "/terms", icon: <FileText color={"white"} size={16} /> },
        { name: "Cookie Policy", href: "/cookies", icon: <Cookie color={"white"} size={16} /> },
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/coverletter4u_", icon: <Twitter size={18} /> },
    { name: "Instagram", href: "https://instagram.com/coverletter4u", icon: <Instagram size={18} /> }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // const data = await response.json();
      
      if (true) {
        setMessage({ text: "send success", type: 'success' });
        setEmail('');
      } else {
        // setMessage({ text: data.error, type: 'error' });
      }
    } catch  {
      setMessage({ text: 'Network error', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white border-t border-primary/20">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div>
              <Link href="/" prefetch={false} className="flex items-center mb-6">
                <div className="flex items-center">
                  <Image
                    src="/logo.svg" 
                    width={180}
                    height={80}
                    alt="CoverLetter4U Logo" 
                    className="h-16 w-16 object-contain"
                  />
                  <span className="ml-2 text-xl font-bold">ShareFolio</span>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Professionally crafted templates to help you build stunning portfolio sites and job proposals that get noticed. Win more opportunities with less effort.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="px-4 py-3 h-12 w-full rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button 
                      variant={"subscribe"}
                      data-focusable
                      disabled={loading}
                      className='p-3'
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Mail size={16} /> Subscribe
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                {message && (
                  <div 
                    className={`flex items-center mt-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {message.type === 'success' ? <Check size={16} className="mr-2" /> : <X size={16} className="mr-2" />}
                    {message.text}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  No spam, just valuable insights and updates
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#1e293b] hover:bg-primary transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {section.title}
                </h3>
                <ul className="space-y-3 flex flex-col gap-5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                      prefetch={false}
                        href={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <span className="text-primary">{link.icon}</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 my-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {currentYear} ShareFolio. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <Button 
                variant="outline" 
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-primary/10 hover:text-white"
                asChild
              >
                <Link href="/privacy" prefetch={false}>
                  <Shield size={16} className="mr-2" />
                  Privacy Policy
                </Link>
              </Button>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-primary/10 hover:text-white"
                asChild
              >
                <Link href="/terms" prefetch={false}>
                  <FileText size={16} className="mr-2" />
                  Terms of Service
                </Link>
              </Button>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-primary/10 hover:text-white"
                asChild
              >
                <Link href="/refund-policy" prefetch={false}>
                 <RefreshCcw  size={16} className="mr-2" />
                  Refund Policy
                </Link>
              </Button>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="bg-transparent border-gray-700 text-gray-400 hover:bg-primary/10 hover:text-white"
                asChild
              >
                <Link href="/contact" prefetch={false}>
                  <MessageSquare size={16} className="mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}