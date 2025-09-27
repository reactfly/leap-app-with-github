import React from 'react';

interface IllustrativeIconProps {
  type: 'cart' | 'pasta' | 'sauce' | 'ingredient' | 'delivery' | 'chef' | 'restaurant' | 'star' | 'truck' | 'clock' | 'location' | 'phone' | 'email' | 'user' | 'heart' | 'fire' | 'leaf' | 'cheese' | 'meat' | 'vegetable' | 'spice';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  animated?: boolean;
  color?: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'yellow' | 'gray' | 'white';
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-12 h-12'
};

const colorClasses = {
  red: 'text-red-500',
  orange: 'text-orange-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  yellow: 'text-yellow-500',
  gray: 'text-gray-500',
  white: 'text-white'
};

export default function IllustrativeIcon({ 
  type, 
  size = 'md', 
  className, 
  animated = false,
  color = 'orange'
}: IllustrativeIconProps) {
  const baseClasses = [
    sizeClasses[size],
    colorClasses[color],
    animated && 'animate-pulse',
    className
  ].filter(Boolean).join(' ');

  const iconComponents = {
    cart: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
        <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
      </svg>
    ),
    
    pasta: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7.5L21 9ZM3 9L9 7.5V5.5L3 7V9ZM12 8C15.31 8 18 10.69 18 14V16H6V14C6 10.69 8.69 8 12 8ZM8 18H16V20H8V18Z"/>
        <path d="M10 10H14V12H10V10Z"/>
        <path d="M8 14H16V16H8V14Z"/>
      </svg>
    ),
    
    sauce: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    
    ingredient: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
        <circle cx="12" cy="12" r="3" fill="white" opacity="0.8"/>
      </svg>
    ),
    
    delivery: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20S9 18.66 9 17H15C15 18.66 16.34 20 18 20S21 18.66 21 17H23V12L20 8ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17S5.17 15.5 6 15.5S7.5 16.17 7.5 17S6.83 18.5 6 18.5ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17S17.17 15.5 18 15.5S19.5 16.17 19.5 17S18.83 18.5 18 18.5ZM17 12V9.5H19.5L21.46 12H17Z"/>
      </svg>
    ),
    
    chef: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7.5L21 9ZM3 9L9 7.5V5.5L3 7V9ZM12 8C15.31 8 18 10.69 18 14V16H6V14C6 10.69 8.69 8 12 8ZM8 18H16V20H8V18Z"/>
        <path d="M10 10H14V12H10V10Z"/>
        <path d="M8 14H16V16H8V14Z"/>
        <circle cx="12" cy="4" r="1" fill="white"/>
      </svg>
    ),
    
    restaurant: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M8.1 13.34L2 19.44L4.56 22L10.66 15.9L8.1 13.34ZM14.12 2.88L12.7 4.3L19.7 11.3L21.12 9.88L14.12 2.88ZM6.34 8.93L4.93 10.34L8.93 14.34L10.34 12.93L6.34 8.93Z"/>
        <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
      </svg>
    ),
    
    star: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
      </svg>
    ),
    
    truck: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20S9 18.66 9 17H15C15 18.66 16.34 20 18 20S21 18.66 21 17H23V12L20 8ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17S5.17 15.5 6 15.5S7.5 16.17 7.5 17S6.83 18.5 6 18.5ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17S17.17 15.5 18 15.5S19.5 16.17 19.5 17S18.83 18.5 18 18.5ZM17 12V9.5H19.5L21.46 12H17Z"/>
      </svg>
    ),
    
    clock: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    
    location: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"/>
      </svg>
    ),
    
    phone: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/>
      </svg>
    ),
    
    email: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
      </svg>
    ),
    
    user: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
      </svg>
    ),
    
    heart: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
      </svg>
    ),
    
    fire: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13.74 3.01 13.54 3.05 13.33 3.12C11.81 3.62 10.72 5.1 10.72 6.8C10.72 7.41 10.89 7.99 11.22 8.5C10.89 8.5 10.56 8.5 10.22 8.5C8.5 8.5 7 9.5 6.5 11C6.5 11.5 6.5 12 6.5 12.5C6.5 15.5 8.5 18 11.5 18.5C12.5 18.8 13.5 18.5 14.5 18C15.5 17.5 16.5 16.5 17 15.5C17.5 14.5 17.5 13.5 17.5 12.5C17.5 12 17.5 11.5 17.66 11.2Z"/>
      </svg>
    ),
    
    leaf: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 6 17.25C7.5 17.25 9 16.5 9 16.5C9 16.5 8.5 18 6.5 18C4.5 18 3 16.5 3 14.5C3 12.5 5 10.5 8 9.5C11 8.5 15 8 17 8Z"/>
      </svg>
    ),
    
    cheese: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
        <circle cx="8" cy="8" r="1"/>
        <circle cx="16" cy="8" r="1"/>
        <circle cx="8" cy="16" r="1"/>
        <circle cx="16" cy="16" r="1"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    
    meat: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
        <path d="M8 8H16V16H8V8Z" fill="white" opacity="0.3"/>
        <circle cx="10" cy="10" r="1" fill="white"/>
        <circle cx="14" cy="10" r="1" fill="white"/>
        <circle cx="10" cy="14" r="1" fill="white"/>
        <circle cx="14" cy="14" r="1" fill="white"/>
      </svg>
    ),
    
    vegetable: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
        <path d="M8 8H16V16H8V8Z" fill="white" opacity="0.3"/>
        <path d="M10 10H14V14H10V10Z" fill="white"/>
      </svg>
    ),
    
    spice: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={baseClasses}>
        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4S20 7.59 20 12S16.41 20 12 20Z"/>
        <path d="M8 8H16V16H8V8Z" fill="white" opacity="0.3"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
        <circle cx="9" cy="9" r="1" fill="white"/>
        <circle cx="15" cy="9" r="1" fill="white"/>
        <circle cx="9" cy="15" r="1" fill="white"/>
        <circle cx="15" cy="15" r="1" fill="white"/>
      </svg>
    )
  };

  const IconComponent = iconComponents[type];
  
  if (!IconComponent) {
    return null;
  }

  return <IconComponent />;
}

// Componente de ícone com contador (para carrinho)
interface IconWithCounterProps extends IllustrativeIconProps {
  count?: number;
  maxCount?: number;
  showCounter?: boolean;
}

export function IconWithCounter({ 
  count = 0, 
  maxCount = 99, 
  showCounter = true,
  ...props 
}: IconWithCounterProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  
  return (
    <div className="relative inline-block">
      <IllustrativeIcon {...props} />
      {showCounter && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 font-bold animate-pulse">
          {displayCount}
        </span>
      )}
    </div>
  );
}

// Componente de ícone animado
interface AnimatedIconProps extends IllustrativeIconProps {
  animation?: 'bounce' | 'pulse' | 'spin' | 'ping' | 'wiggle';
}

export function AnimatedIcon({ 
  animation = 'pulse',
  ...props 
}: AnimatedIconProps) {
  const animationClasses = {
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping',
    wiggle: 'animate-wiggle'
  };

  return (
    <div className={animationClasses[animation]}>
      <IllustrativeIcon {...props} />
    </div>
  );
}

// Componente de ícone responsivo
interface ResponsiveIconProps extends IllustrativeIconProps {
  breakpoints?: {
    sm?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    md?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    lg?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    xl?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  };
}

export function ResponsiveIcon({ 
  breakpoints = {
    sm: 'sm',
    md: 'md', 
    lg: 'lg',
    xl: 'xl'
  },
  size = 'md',
  ...props 
}: ResponsiveIconProps) {
  const responsiveClasses = [
    sizeClasses[size],
    breakpoints.sm && `sm:${sizeClasses[breakpoints.sm]}`,
    breakpoints.md && `md:${sizeClasses[breakpoints.md]}`,
    breakpoints.lg && `lg:${sizeClasses[breakpoints.lg]}`,
    breakpoints.xl && `xl:${sizeClasses[breakpoints.xl]}`
  ].filter(Boolean).join(' ');

  return (
    <IllustrativeIcon 
      {...props} 
      size={size}
      className={[responsiveClasses, props.className].filter(Boolean).join(' ')}
    />
  );
}
