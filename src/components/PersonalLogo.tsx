import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface PersonalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'monochrome' | 'inverted';
  showText?: boolean;
  isCover?: boolean;
}

export const PersonalLogo: React.FC<PersonalLogoProps> = ({
  size = 'md',
  variant = 'color',
  showText = true,
  isCover = false,
}) => {
  const { data } = usePortfolio();
  
  const customLogo = isCover 
    ? (data.profile?.coverCustomLogoUrl || data.profile?.customLogoUrl) 
    : data.profile?.customLogoUrl;

  const showTextSetting = isCover
    ? (data.profile?.coverShowLogoText ?? data.profile?.showLogoText ?? true)
    : (data.profile?.showLogoText ?? true);

  const shouldShowText = showText && showTextSetting;

  const fontChoice = isCover
    ? (data.profile?.coverLogoFontFamily || data.profile?.logoFontFamily || 'GatsbyFLF')
    : (data.profile?.logoFontFamily || 'GatsbyFLF');

  const line1Text = isCover
    ? (data.profile?.coverLogoLine1 !== undefined ? data.profile.coverLogoLine1 : (data.profile?.logoLine1 !== undefined ? data.profile.logoLine1 : 'ESTUDIO DE'))
    : (data.profile?.logoLine1 !== undefined ? data.profile.logoLine1 : 'ESTUDIO DE');

  const line2Text = isCover
    ? (data.profile?.coverLogoLine2 !== undefined ? data.profile.coverLogoLine2 : (data.profile?.logoLine2 !== undefined ? data.profile.logoLine2 : 'DISEÑO'))
    : (data.profile?.logoLine2 !== undefined ? data.profile.logoLine2 : 'DISEÑO');

  const getFontFamilyStyle = () => {
    switch (fontChoice) {
      case 'Cinzel':
        return { fontFamily: "'Cinzel', serif", letterSpacing: '0.2em' };
      case 'Cormorant':
        return { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600 };
      case 'Playfair':
        return { fontFamily: "'Playfair Display', serif", fontWeight: 700 };
      case 'Sans':
        return { fontFamily: "'Montserrat', sans-serif", fontWeight: 700 };
      case 'GatsbyFLF':
      default:
        return { fontFamily: "Georgia, serif", letterSpacing: '0.25em' };
    }
  };

  const sizeMap = {
    sm: { svg: 32, wh: 'w-8 h-8', text: 'text-xs' },
    md: { svg: 46, wh: 'w-[46px] h-[46px]', text: 'text-sm' },
    lg: { svg: 64, wh: 'w-16 h-16', text: 'text-base' },
    xl: { svg: 96, wh: 'w-24 h-24', text: 'text-xl' },
    '2xl': { svg: 128, wh: 'w-32 h-32', text: 'text-2xl' }
  };

  const activeSize = isCover ? (data.profile?.coverLogoSize || size) : size;
  const { wh: sizeClasses, svg: svgSize, text: textSize } = sizeMap[activeSize] || sizeMap[size];

  const containerClass = isCover 
    ? "flex flex-col items-center justify-center text-center gap-3 select-none"
    : "flex items-center gap-3 select-none";

  const isColor = variant === 'color';
  const isInverted = variant === 'inverted';

  const strokeColor = isInverted ? '#F8FAFC' : isColor ? '#0F172A' : '#334155';
  const circleFill = isColor ? '#E6257E' : 'none';
  const triangleFill = isColor ? '#FFFFFF' : 'none';
  const squareFill = isColor ? '#0266B3' : 'none';

  return (
    <div className={containerClass}>
      {customLogo ? (
        <div 
          className={`relative flex items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-105 ${sizeClasses}`}
          title="Logotipo Personalizado"
        >
          <img 
            src={customLogo} 
            alt="Logotipo Personal" 
            className="w-full h-full object-contain drop-shadow-xs"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div 
          className="relative flex items-center justify-center transition-transform hover:scale-105"
          style={{ width: svgSize, height: svgSize }}
          title="Estudio de Diseño"
        >
          <svg
            viewBox="0 0 100 100"
            width={svgSize}
            height={svgSize}
            className="drop-shadow-xs"
          >
            {isColor ? (
              <>
                <circle cx="50" cy="50" r="46" fill={circleFill} />
                <polygon
                  points="16,28 84,28 50,86"
                  fill={triangleFill}
                />
                <rect
                  x="37"
                  y="28"
                  width="26"
                  height="26"
                  fill={squareFill}
                />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#1E293B" strokeWidth="1.5" opacity="0.3" />
                <polygon points="16,28 84,28 50,86" fill="none" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" />
                <rect x="37" y="28" width="26" height="26" fill="none" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" />
              </>
            ) : (
              <>
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                <polygon
                  points="16,28 84,28 50,86"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                <rect
                  x="37"
                  y="28"
                  width="26"
                  height="26"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
              </>
            )}
          </svg>
        </div>
      )}

      {shouldShowText && (
        <div className={`flex flex-col tracking-wider font-light leading-tight ${isCover ? 'items-center text-center' : ''}`} style={getFontFamilyStyle()}>
          <span className={`${textSize} font-extralight tracking-[0.22em] text-slate-800 dark:text-slate-200 uppercase`}>
            {line1Text}
          </span>
          <span className={`${textSize} font-normal tracking-[0.32em] text-slate-950 dark:text-white uppercase`}>
            {line2Text}
          </span>
        </div>
      )}
    </div>
  );
};
