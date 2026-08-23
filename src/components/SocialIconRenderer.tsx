import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Globe, 
  Youtube, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Send, 
  Code, 
  Share2, 
  Camera, 
  Link2, 
  Mail, 
  Phone,
  Music2
} from 'lucide-react';

export interface SocialIconOption {
  id: string;
  name: string;
  defaultLabel: string;
  defaultUrl: string;
  darkColor: string;
  lightColor: string;
}

export const SOCIAL_ICON_OPTIONS: SocialIconOption[] = [
  { id: 'instagram', name: 'Instagram', defaultLabel: 'Instagram', defaultUrl: 'https://instagram.com/', darkColor: 'text-pink-400', lightColor: 'text-pink-600' },
  { id: 'whatsapp', name: 'WhatsApp', defaultLabel: 'WhatsApp', defaultUrl: 'https://wa.me/', darkColor: 'text-emerald-400', lightColor: 'text-emerald-600' },
  { id: 'linkedin', name: 'LinkedIn', defaultLabel: 'LinkedIn', defaultUrl: 'https://linkedin.com/in/', darkColor: 'text-sky-400', lightColor: 'text-sky-600' },
  { id: 'behance', name: 'Behance', defaultLabel: 'Behance', defaultUrl: 'https://behance.net/', darkColor: 'text-indigo-400', lightColor: 'text-indigo-600' },
  { id: 'tiktok', name: 'TikTok', defaultLabel: 'TikTok', defaultUrl: 'https://tiktok.com/@', darkColor: 'text-cyan-400', lightColor: 'text-cyan-600' },
  { id: 'youtube', name: 'YouTube', defaultLabel: 'YouTube', defaultUrl: 'https://youtube.com/@', darkColor: 'text-red-400', lightColor: 'text-red-600' },
  { id: 'facebook', name: 'Facebook', defaultLabel: 'Facebook', defaultUrl: 'https://facebook.com/', darkColor: 'text-blue-400', lightColor: 'text-blue-600' },
  { id: 'twitter', name: 'X / Twitter', defaultLabel: 'X (Twitter)', defaultUrl: 'https://x.com/', darkColor: 'text-neutral-300', lightColor: 'text-slate-800' },
  { id: 'telegram', name: 'Telegram', defaultLabel: 'Telegram', defaultUrl: 'https://t.me/', darkColor: 'text-sky-400', lightColor: 'text-sky-600' },
  { id: 'github', name: 'GitHub', defaultLabel: 'GitHub', defaultUrl: 'https://github.com/', darkColor: 'text-purple-400', lightColor: 'text-purple-600' },
  { id: 'dribbble', name: 'Dribbble', defaultLabel: 'Dribbble', defaultUrl: 'https://dribbble.com/', darkColor: 'text-rose-400', lightColor: 'text-rose-600' },
  { id: 'pinterest', name: 'Pinterest', defaultLabel: 'Pinterest', defaultUrl: 'https://pinterest.com/', darkColor: 'text-rose-500', lightColor: 'text-rose-600' },
  { id: 'globe', name: 'Sitio Web', defaultLabel: 'Sitio Web', defaultUrl: 'https://', darkColor: 'text-teal-400', lightColor: 'text-teal-600' },
  { id: 'link', name: 'Enlace / Link', defaultLabel: 'Enlace', defaultUrl: 'https://', darkColor: 'text-amber-400', lightColor: 'text-amber-600' },
  { id: 'mail', name: 'Correo Alterno', defaultLabel: 'Correo', defaultUrl: 'mailto:', darkColor: 'text-amber-300', lightColor: 'text-amber-700' },
  { id: 'phone', name: 'Teléfono Alterno', defaultLabel: 'Teléfono', defaultUrl: 'tel:', darkColor: 'text-pink-400', lightColor: 'text-pink-600' }
];

export const detectSocialIconFromUrl = (url: string): string => {
  const clean = url.toLowerCase().trim();
  if (clean.includes('instagram.com') || clean.includes('instagr.am')) return 'instagram';
  if (clean.includes('linkedin.com')) return 'linkedin';
  if (clean.includes('behance.net')) return 'behance';
  if (clean.includes('dribbble.com')) return 'dribbble';
  if (clean.includes('github.com')) return 'github';
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) return 'youtube';
  if (clean.includes('tiktok.com')) return 'tiktok';
  if (clean.includes('wa.me') || clean.includes('whatsapp.com')) return 'whatsapp';
  if (clean.includes('twitter.com') || clean.includes('x.com')) return 'twitter';
  if (clean.includes('facebook.com') || clean.includes('fb.me')) return 'facebook';
  if (clean.includes('t.me') || clean.includes('telegram.me')) return 'telegram';
  if (clean.includes('pinterest.com')) return 'pinterest';
  if (clean.startsWith('mailto:')) return 'mail';
  if (clean.startsWith('tel:')) return 'phone';
  return 'link';
};

export const detectSocialNameFromUrl = (url: string): string => {
  const icon = detectSocialIconFromUrl(url);
  const found = SOCIAL_ICON_OPTIONS.find(o => o.id === icon);
  return found ? found.name : 'Enlace Web';
};

interface SocialIconProps {
  iconName?: string;
  className?: string;
  isDark?: boolean;
}

export const getSocialIconComponent = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case 'instagram':
      return Instagram;
    case 'linkedin':
      return Linkedin;
    case 'behance':
    case 'globe':
      return Globe;
    case 'youtube':
      return Youtube;
    case 'facebook':
      return Facebook;
    case 'twitter':
    case 'x':
      return Twitter;
    case 'whatsapp':
    case 'messagecircle':
    case 'chat':
      return MessageCircle;
    case 'telegram':
    case 'send':
      return Send;
    case 'github':
    case 'code':
      return Code;
    case 'dribbble':
    case 'share2':
    case 'share':
      return Share2;
    case 'pinterest':
    case 'camera':
      return Camera;
    case 'tiktok':
    case 'music':
    case 'music2':
      return Music2;
    case 'mail':
      return Mail;
    case 'phone':
      return Phone;
    case 'link':
    case 'link2':
    default:
      return Link2;
  }
};

export const getSocialIconColors = (iconName?: string, isDark: boolean = true) => {
  const match = SOCIAL_ICON_OPTIONS.find(o => o.id === iconName?.toLowerCase());
  if (match) {
    return isDark ? match.darkColor : match.lightColor;
  }
  return isDark ? 'text-pink-400' : 'text-pink-600';
};

export const SocialIcon: React.FC<SocialIconProps> = ({ iconName, className = 'w-4 h-4 shrink-0', isDark = true }) => {
  const IconComponent = getSocialIconComponent(iconName);
  const colorClass = getSocialIconColors(iconName, isDark);
  
  return <IconComponent className={`${className} ${colorClass}`} />;
};
